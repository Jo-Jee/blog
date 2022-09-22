---
id: operator
title: Operator pattern
date: 2022-09-22
summary: Kubernetes operator에 대해 알아본다
topic: kubernetes
published: false
tags:
  - kubernetes
  - k8s
  - operator
---
## CRD (Custom Resource Definition)
kubernetes에는 Pod, Deployment, Configmap 등 여러가지 객체가 있다. 이런 객체들은 etcd에 상태가 저장된다. 그 때 이런 객체와 달리 kubernetes에 정의되지 않은 객체를 정의할 수 있게 해주는게 CRD이다. CRD를 정의하면 정의된 대로 객체를 생성할 수 있는데 이렇게 생성한 객체를 Custom Resource (CR) 이라고 한다.

## Custom Controller
이런 CR은 etcd에 기록만 될 뿐 실제 어떤 동작을 할 순 없다. Controller가 없기 때문이다. 이를 위해서는 해당 객체가 상태가 변경됐을 때 특정 동작을 수행하는 Controller가 필요하다.

## Operator
CRD와 Custom Conteroller를 사용해 특정 앱을 쿠버네티스에 구성하고 제어하는게 Operator pattern이다. Operator를 만들어 놓으면 etcd에 있는 CR의 변화를 감지하고 실제 클러스터에 상태를 동기화한다. operator-sdk 등을 사용해 개발할 수 있다.

## Helm과의 차이
Helm은 리소스를 템플릿화 하고 배포하는 도구이다. Operator는 이런 오브젝트들을 패키징하는 도구라기 보다는 커스텀 리소스를 정의하고 동작하게하는 도구이다. 그래서 operator를 Helm을 통해 배포할 수 있다.
