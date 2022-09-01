---
id: helm-vs-kustomize
title: Helm vs Kustomize
date: 2022-09-01
summary: Helm과 Kustomize를 비교해보고 서로의 장단점을 알아본다.
topic: kubernetes
published: true
tags:
  - kubernetes
  - k8s
  - helm
  - kustomize
---
## Helm vs Kustomize
우선 둘은 지향하는 방향이 아예 다르다. 하나는 Template을 만드는 툴이고 하나는 Overlay를 하는 툴이다. Helm은 변수와 간단한 반복문등을 통해서 Template을 생성하고 k8s 클러스터에 적용하는 툴이다. 반면에 Kustomize는 하나의 부모 yaml을 만들어놓고 여기에 필요한 부분을 덮어쓰거나 추가하는 방식을 취하고 있다. 아래의 pod을 각자 다른 port로 배포한다고 가정하고 예를 들어보자.

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```

## Helm

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: {{ .Values.servicePort }}
```

Helm의 경우 위와같이 pod.yaml을 변경하고 values.yaml에 필요한 servicePort를 변수로 추가하거나 배포시에 --set 옵션을 통해 전달할 수 있다. 즉 Template을 만들어 놓고 변수를 조작해 k8s 오브젝트를 생성, 관리할 수 있다.

## Kustomize

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```

Kustomize의 경우는 위와 같다. 볼 수 있듯이 변경된게 없다. 그럼 환경별로 다른 port로 배포를 하려면 어떻게 해야할까?

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
    ports:
    - containerPort: 80
```

위와같이 덮어쓰거나 추가할 부분을 따로 정의해 파일로 만들어주면 된다.

## Helm과 Kustomize의 차이
아주 간단한 예제로 알아봤지만 사실 Helm은 패키지 매니저처럼 차트들을 패키지로 관리할 수 있고 Kustomize는 Secret이나 Configmap을 생성할 수 있는 등 위 예제로는 볼 수 없는 서로의 기능이나 특징이 존재한다. 하지만 가장 근본적인 차이를 볼 수 있는 예제였다고 생각한다.

Helm은 말 그대로 Template이기 때문에 Template을 기준으로 변수 등으로 오브젝트를 생성하는 방식을 취한다. 반대로 Kustomize는 오브젝트를 선언해놓고 그 오브젝트에서 달라져야하는 부분을 따로 다시 정의한다. OOP에서 볼 수 있는 상속에 가깝다.

## 장단점
Helm은 변수들을 통해 환경만 다른 app을 배포하거나 관리하는 입장에서는 굉장히 편한 도구일 수 있다. 또 변수에 따라 많은 오브젝트를 반복적으로 생성해야하는 상황이 있다면 반복문과 조건문으로 간단히 처리할 수 있다. 하지만 어떤 환경에는 존재하고 어떤 환경에는 존재하지 않는 값이 있다거나 하는 Template 자체가 달라져야 하는 상황에서는 조건문 등을 통해 처리해야한다. 이게 실제로 사용해보면 상당히 번거롭다. 

Kustomize는 비교적 자유롭게 base에 없는 요소들을 추가할 수 있어서 여러 app의 겹치는 부분을 두고 app별로 다른 부분만 따로 정의해서 사용하기엔 좋다. 하지만 OOP의 상속처럼 결국 덮어쓰는 과정에서 예상치 못한 결과를 얻을 수 있다. 또 간단히 값들만 정의해 환경을 분리할 수 있는 상황에서는 Helm보다 작성해야하는 것들이 많아진다.
