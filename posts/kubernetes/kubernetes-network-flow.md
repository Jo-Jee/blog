---
id: kubernetes-network-flow
title: Kubernetes Network flow
date: 2022-08-11
summary: Kubernetes의 네트워크 흐름의 전체적인 구조를 알아본다.
topic: kubernetes
published: true
tags:
  - kubernetes
  - network
---
## 네트워크 인터페이스
1. Host ethernet: 호스트에서 사용중인 실제 네트워크 인터페이스
2. CNI ethernet: CNI가 생성하는 가상 오버레이 네트워크 인터페이스
3. Docker ethernet: Docker가 생성하는 가상 네트워크 브릿지
4. veth: Docker container가 가지는 가상 네트워크 인터페이스인데 k8s에서는 Pod내의 모든 container가 pause container의 veth 하나를 공유

## 네트워크 통신 시나리오
쿠버네티스의 네트워크 통신이라고 하면 4가지를 생각해볼 수 있다.

1. Pod내의 Containter to Container
2. Pod to Pod
3. Pod to Service
4. external to Service

## Pod내의 Container to Container
위의 인터페이스 구조에서 볼 수 있듯이 pause container의 네트워크 인터페이스를 공유하는 구조이기 때문에 port로 서로를 구분하고 공유된 인터페이스를 통해 localhost로 통신한다.

## Pod to Pod
Pod는 veth기준으로 고유한 IP주소를 가진다. 이 IP 주소는 CNI가 관리를 한다. 따라서 각 Pod들은 CNI로 구성된 네트워크 인터페이스를 통해 서로 통신할 수 있다. 

## Pod to Service
Pod가 Service에 요청을 보내게 되면 Kubernetes의 DNS를 통해 Service의 IP를 받아서 요청을 하게 된다. 그러면 아래와 같은 순서로 패킷이 처리된다.

1. veth는 해당 IP를 모르기 때문에 상위 게이트웨이로 전달
2. cni도 해당 IP를 모르기 때문에 상위 게이트웨이로 전달
3. eth는 kube-proxy에 의해 netfilter에 해당 IP가 정의 돼있으므로 포워딩
4. 포워딩 받은 cni가 service로 포워딩
5. service가 Pod으로 포워딩

이런 순서로 통신이 이뤄지게 된다.

## external to Service
### NodePort
모든 노드의 특정 포트를 특정 CluterIP로 포워딩 하도록 설정한다. 이 후에는 위의 Pod to Service의 순서를 거친다.

### LoadBalancer
클라우드 서버에서 제공하는 로드밸런서를 만들어 서비스로 포워딩 한다.

### ingress
트래픽을 받아서 TLS 등 특정 처리를 하거나 룰에 따라 다른 서비스에 트래픽을 보내줘야 할 때 alb나 nginx등을 사용해 트래픽을 처리한다.