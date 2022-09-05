---
id: kube-proxy
title: kube-proxy
date: 2022-08-04
summary: kube-proxy의 동작 원리를 알아본다.
topic: kubernetes
published: true
tags:
  - kubernetes
  - kube-proxy
  - network
---
## kube-proxy 확인 해보기
kube-proxy는 Kubernetes 네트워크를 관리하는 컴포넌트이다. 기본적으로 kubelet처럼 모든 Node에 하나씩 설치되는 구조이다. 따라서 DaemonSet으로 배포돼 있다. 그래서

```
kubectl get po -n kube-system
```

으로 kube-proxy pod을 확인할 수 있고 노드와 개수가 똑같은 것을 알 수 있다.

## kube-proxy 동작 원리
proxy는 서버와 클라이언트 사이에서 트래픽을 전달해주는 역할을 한다. 서버가 proxy로 역할을 수행하는 방법을 생각 해보면 우선 kubernetes는 service 기반으로 routing을 하기 때문에 service에 관한 모든 트래픽을 이 kube-proxy가 받는다. 그러면 control plan 에게 전달받은 routing 규칙들을 통해 특정 pod로 트래픽을 보내주면 된다.

아주 간단하게 해결된 것 같지만 서버는 통신을 위해 interface가 필요하다. 그리고 kubernetes에서 interface라고 하면 pod에 존재하는 가상 ethernet이 있고 실제 host의 ethernet이 있다. 그럼 위의 방법으로는 불필요한 hop이 많이 생겼다. 그래서 kube-proxy는 nginx나 envoy 처럼 실제 proxy로 동작하는 서버가 아니라 좀 특이한 방법을 취한다.

바로 netfilter와 iptables를 사용하는 방법이다. netfilter는 리눅스 커널에서 네트워크 트래픽을 관리하는 프레임워크이다. 그리고 iptables는 이 netfilter에서 트래픽을 처리하는 룰을 정할 수 있는 프로그램이다. 그래서 kube-proxy는 마스터에서의 변화를 감지해서 iptables를 통해 netfilter의 routing 설정을 변경하고 네트워크 트래픽은 자연스럽에 커널 레벨에서 해당 pod를 찾아가게 된다.

이렇게 하면 실제 proxy로 동작하는 방식보다 hop도 줄어들고 변경사항에 대해서도 빠르게 대처가 가능한 구조가 만들어진다.

## HA
이러한 방식으로 작동하는 kube-proxy는 문제가 생겼을 때 2가지 장점이 있다.

1. DaemonSet으로 관리하기 때문에 문제가 생겨 pod이 제거돼도 복구된다.
2. 물리 서버가 동작한다면 kube-proxy가 일시적으로 장애가 생겨도 신규 변화 이외에는 동작에 문제가 없다.

kube-proxy가 Kubernetes의 워커 네트워크를 관리하는 만큼 장애가 생기면 당연히 문제가 생기겠지만 위의 구조로 인해 일시적인 장애들은 문제없이 지나갈 수 있다.
