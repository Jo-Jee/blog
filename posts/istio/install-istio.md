---
id: install-istio
title: istio 설치
date: 2022-11-17
summary: istio 설치 방법들에 대해 알아본다.
topic: istio
published: true
tags:
  - istio
  - kubernetes
---
## 설치 방법 결정
istio를 클러스터에 설치하는 방법은 크게 3가지가 있다.
  1. istioctl
  2. helm
  3. operator

helm 이나 operator도 익숙한 방법인데 보통 istioctl을 통해 설치하고 일반적으로 사용할 수 있는 profile을 여러개 정의 해놨기 때문에 제일 편했다. 그래서 istioctl을 통해 설치했다.

## istioctl 설치
```
curl -L https://istio.io/downloadIstio | sh -
mv istio-1.15.3/bin/istioctl /usr/local/bin
```

홈페이지에서는 PATH에 추가해서 export 하는 방식을 권하는데 굳이 그럴필요 없이 istioctl을 bin에 옮겨주면 된다.

## istio 설치
istioctl은 profile을 여러개 제공한다. 각 profile의 차이점은 아래 표와 같다.
![istio profile](/image/istio/istio-profile-table.png)
여러 테스트를 위해서 모든 컴포넌트가 포함된 demo profile로 설치한다.

```
istioctl install --set profile=demo
```

설치 자체는 이렇게 하면 간단하게 끝난다.

## 설치 확인
```
kubectl -n istio-system get deploy
NAME                   READY   UP-TO-DATE   AVAILABLE   AGE
istiod                 1/1     1            1           57s
istio-ingressgateway   1/1     1            1           43s
istio-egressgateway    1/1     1            1           43s
```

이렇게 간단하게 설치하고 설치 확인을 할 수 있다.
