---
id: https-on-traefik-ingress
title: traefik ingress에 https적용
date: 2022-09-04
summary: k3s 기본 ingress인 traefik ingress에 https를 적용 해본다.
topic: k3s
published: false
tags:
  - kubernetes
  - k3s
  - traefik ingress
---
## cert-manager

### cert-manager?
우선 k3s에 https를 적용하기 위해서 letsencript를 사용할건데 원래는 dns인증을 하고 주기마다 갱신 cron을 구성하는 등 부가적인 작업들이 많았다. 그런데 찾아보니까 k8s에서 https를 위한 인증서를 생성하고 자동 갱신해주는 cert-manager라는 컨트롤러가 있어서 사용해봤다.

### cert-manager 설치
Helm 등 여러가지 방법으로 설치가 가능한데 아래 방법이 가장 심플해서 kubectl로 바로 설치했다.

```
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.9.1/cert-manager.yaml
```

설치하고 나면 우선 Issuer를 생성해줘야 한다.

```
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
spec:
  acme:
    email: <YOUR EMAIL>
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: tls-key
    solvers:
    - http01:
        ingress:
          class: traefik
```

Issuer롸 ClusterIssuer를 kind로 정의할 수 있는데 지금 구조로는 여러 Ingress에서 https 처리를 해야하므로 ClusterIssuer를 사용했다. 이렇게 Issuer를 생성하고 나면 인증서를 사용할 각 namespace에 Certificate을 생성한다.

```
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: tls-cert
  namespace: default
spec:
  secretName: tls-secret
  issuerRef:
    name: letsencrypt
    kind: ClusterIssuer
  commonName: <YOUT HOST>
  dnsNames:
    - <YOUT HOST>
```

그리고 이렇게 생성한 Certificate을 Ingress에 적용한다.

```
apiVersion: networking.k8s.io/v1
kind: Ingress
...
spec:
  tls:
  - hosts:
    - blog.jojee.co.kr
    secretName: tls-secret
  rules:
...
```

그러면 https를 바로 적용할 수는 있는데 https redirect를 할 수가 없다. 그래서

```
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: tls-redirect
  namespace: <NAMESPACE>

spec:
  redirectScheme:
    scheme: https
    permanent: true
```

이렇게 middleware를 정의하고

```
apiVersion: networking.k8s.io/v1
kind: Ingress
...
  annotations:
    kubernetes.io/ingress.class: traefik
    traefik.ingress.kubernetes.io/router.middlewares: <NAMESPACE>-tls-redirect@kubernetescrd
...
```

ingress에 적용해주면 http로 접속했을 때 http로 redirecte 해준다.
