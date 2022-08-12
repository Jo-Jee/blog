---
id: why-kubespray
title: 쿠버네티스 배포 도구 비교
date: 2022-07-22
summary: kubespray, kubeadm, kops등 쿠버네티스 배포 도구 간단 비교 및 kubespray를 사용하는 이유
topic: kubespray
published: true
tags:
  - kubernetes
  - kubespray
  - kubeadm
  - kops
---
## Kubernetes 배포 도구
k8s를 구성하는 방법은 여러가지가 있다.

1. k8s 바이너리를 직접 설치
2. 관리형 k8s 서비스를 사용 (EKS, GKE, AKS 등)을 사용
3. k8s 배포 도구 (kubeadm, kops, kubespray 등)을 사용

먼저 1번은 다음에 꼭 한번 해보고싶지만 이번엔 블로그도 올려야하고 CI/CD 연결 등 할 작업이 많기 때문에 이번엔 고려하지 않았다.

2번은 production 레벨에서 실제 운영하는게 목적이라면 확실히 좋은 선택인 것 같다. master의 관리나 스케일링을 신경쓰는걸 생각하면 비용이 저렴하다고 생각하기 때문이다. 특히 etcd를 관리하는게 참 번거로운데 이런 부분들을 관리해주는것 치고는 확실히 저렴하다. 하지만 지금은 공부 목적이기 때문에 고려대상이 아니다.

그래서 자연스럽게 3번으로 결정했다.

## kops
kops는 클라우드에 클러스터를 자동으로 배포해주는 툴이다. 현재는 AWS만 공식 지원한다. 현재 AWS를 사용할 예정이라 사용할 수는 있지만 인스턴스 생성과 네트워크 등 필요한 요소들을 알아서 생성해주기 때문에 어느정도 공부의 목적도 가지고있는 상황에 맞지는 않는것 같았다.

## kubeadm
kubeadm은 쿠버네티스를 쉽게 설치하고 관리할 수 있게 해주는 관리 도구이다. 처음 설치할 때도 쉽게 할 수 있다는 장점이 있다. 또, kops와는 다르게 베어메탈이나 AWS EC2 등 가리지않고 사용이 가능하다는 장점도 있다.

## kubespray
kubeadm은 굉장히 좋은 툴이다. 그런데 kubespray는 kubeadm + Ansible 조합이라고 한다.

## 결론
평소에 IaC에도 관심이 있어서 Ansible도 같이 공부할 수 있는 기회가 될 수 있을 것 같았다. 또 kubeadm의 대부분 기능들을 사용할 수 있다고 해서 kubespray로 선택하게 됐다.
