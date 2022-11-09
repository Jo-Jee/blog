---
id: what-is-istio
title: istio
date: 2022-11-09
summary: istio를 알아본다.
topic: istio
published: true
tags:
  - kubernetes
  - istio
---
## Service Mesh?
최근 서비스들이 MSA를 많이 채택한다. MSA 특성 상 서비스가 커지면 개수가 많아지고 서로 호출하는 경우가 많아진다. 이렇게 여러 서비스가 복잡하게 연결되는게 Mesh network와 비슷한 형태를 띈다고 해서 Service Mesh라고 한다. 이런 복잡한 트래픽 흐름을 안전하고 빠르게 만들 수 있게하는 인프라 레이어가 Service Mesh이다.

## Istio?
이런 Service Mesh를 구현한 오픈소스 솔루션이 Istio이다. 인프라 레이어에서 적용하기 때문에 서비스코드의 변경 없이 인증, 모니터링 등 서비스를 관리할 수 있다.

## Istio 구조
Istio는 Data Plane과 Control Plane으로 구성돼있다. Data Plane은 파드에 사이드카로 붙어서 실제 트래픽을 컨트롤하는 envoy proxy이다. 그리고 이 envoy proxy를 컨트롤하는 부분이 Control Plane이다.

## 주요 기능
  - 트래픽 제어: 간단한 규칙을 통해 트래픽을 제어할 수 있다. 서킷 브레이커, 타임아웃, 재시도 등 트래픽 문제를 방지할 수도 있고 A/B 테스트, 카나리 배포 등 트래픽 분할을 수행할 수도있다.
  - 모니터링: 복잡한 서비스에서 모든 트래픽에 대해 상세하게 분석을 할 수 있다. 자세한 메트릭을 쌓아서 볼 수 있고 로그도 관리할 수 있다.
  - 보안: 기본적으로 트래픽이 TLS를 통해 암호화 된다. AAA(Authentication Authorization Audit) 도구를 사용해 서비스와 데이터를 보호할 수 있다.
