---
id: kube-proxy-ipvs-mode
title: kube-proxy IPVS 모드 적용
date: 2022-10-09
summary: kube-proxy의 IPVS 모드에 대해 알아보고 클러스터에 적용하는 방법을 알아본다.
topic: kubernetes
published: true
tags:
  - kubernetes
  - kube-proxy
  - ipvs
---
## IPVS
kube-proxy의 동작방법은 블로그의 [kube-proxy](https://blog.jojee.co.kr)포스팅에서 확인할 수 있다.
kube-proxy는 리눅스 커널의 netfilter를 사용해 트래픽을 관리한다. 기본적으로 iptables를 이용해 사용하는데 이 때 iptables는 chain을 만들어 관리하고 규칙이 많아질 때 마다 체인이 많아져 트래픽 처리가 오래 걸린다. 규칙 수 기준으로 시간복잡도가 O(N)이라고 한다.

반면 IPVS는 netfilter 기반의 linux kernel에서 동작하는 L4 load balancing tool이다. 여러 차이가 있지만 가장 크게 IPVS는 IPVS테이블을 생성해 패킷을 관리한다. 그리고 이 테이블이 해쉬테이블이기 때문에 트래픽 처리에 O(1)의 시간복잡도를 가진다. 서비스가 많아져 라우팅 규칙이 많아질수록 이 차이는 커지게 된다.

또 다른 차이로는 loadbalancing 툴이기 때문에 Round-Robin 이나 Least-Connection 등 여러 알고리즘을 사용해 패킷을 관리할 수 있다.

## kube-proxy IPVS모드 적용
현재 EKS를 사용 중이므로 Amazon linux2 기준으로 설명한다.

IPVS는 기본적으로 설치돼있지 않기 때문에 사용하기 위해서는 우선 모든 노드에서 IPVS를 사용할 수 있도록 IPVS를 설치해줘야한다.

``` shell
yum install -y ipvsadm
```

모든 노드에서 사용할 수 있어야 하므로 해당 기능을 설치 후 ami를 만들어 모든 노드에 적용한다. 그리고 kube-proxy에서 IPVS mode를 사용하도록 설정한다.

``` shell
kubectl edit cm kube-proxy-config -n kube-systm
```

``` yaml
apiVersion: v1
data:
  config: |-
    apiVersion: kubeproxy.config.k8s.io/v1alpha1
    bindAddress: 0.0.0.0
    clientConnection:
      acceptContentTypes: ""
      burst: 10
      contentType: application/vnd.kubernetes.protobuf
      kubeconfig: /var/lib/kube-proxy/kubeconfig
      qps: 5
    clusterCIDR: ""
    configSyncPeriod: 15m0s
    conntrack:
      maxPerCore: 32768
      min: 131072
      tcpCloseWaitTimeout: 1h0m0s
      tcpEstablishedTimeout: 24h0m0s
    enableProfiling: false
    healthzBindAddress: 0.0.0.0:10256
    hostnameOverride: ""
    iptables:
      masqueradeAll: false
      masqueradeBit: 14
      minSyncPeriod: 0s
      syncPeriod: 30s
    ipvs:
      excludeCIDRs: null
      minSyncPeriod: 0s
      scheduler: ""
      syncPeriod: 30s
    kind: KubeProxyConfiguration
    metricsBindAddress: 127.0.0.1:10249
    mode: "iptables" -> "ipvs"
    nodePortAddresses: null
    oomScoreAdj: -998
    portRange: ""
    udpIdleTimeout: 250ms
kind: ConfigMap
```

위 mode에 기본값으로 `iptables`를 사용 중인데 이 부분을 `ipvs`로 바꿔준다. 이 후 kube-proxy를 재배포한다.

``` shell
kubectl rollout restart ds/kube-proxy -n kube-system
```

이렇게 IPVS를 간단하게 적용할 수 있다.

## 스케줄링 알고리즘
IPVS는 스케줄링을 위한 알고리즘도 제공하는데 아래와 같다.
  - **Round Robin (RR)**: 패킷을 들어온 순서대로 모든 서버에 동일하게 분산한다. 아무 설정도 하지 않으면 기본적으로 이 알고리즘이 사용된다.
  - **Weighted Round Robin (WRR)**: RR에 가중치를 주어 가중치에 비례해 패킷을 분산한다. 서버간 처리능력이 다르면 유용하다.
  - **Least Connection (LC)**: 커넥션이 가장 적은 서버에 패킷을 전달한다.
  - **Weighted Least Connection (WLC)**: LC에 가중치를 둔 방식으로 WRR과 같이 서버간 처리능력에 차이가 있을 때 유용하다.
  - **Destination Hashing (DH)**: 목적지 IP 주소의 해시값을 기반으로 패킷을 분산한다. 
  - **Shortest Expected Delay (SED)**: 예상되는 응답속도가 가장 빠른 서버를 선택합니다. 예상이라고 한 이유는 실제 패킷의 응답속도를 확인하는게 아니라 Established인 커넥션이 가장 적은 서버를 선택한다.
  - **Never Queue(NQ)**: SED와 같이 커넥션이 적은 서버를 선택하지만 0인 서버를 최우선으로 한다.
  - **Locality-Based Least-Connection (LBLC)**: 지정값을 넘기 전까지 한 서버를 선택하다가 넘어가면 다음 서버를 선택한다. 모든 서버가 지정값을 넘으면 마지막 선택한 서버에 계속 트래픽을 보낸다.
  - **Locality-Based Least-Connection with Replication (LBLCR)**: LBLC에서 지정값을 넘었을 때 커넥션가 가장 적은 서버를 선택한다.

## 결론
지금까지 알아본걸로는 IPVS의 단점보다는 장점이 많았다. 적용하는 것도 간단하기 때문에 대부분은 적용하는게 이득이 많을 것 같다.
