---
id: istio-gateway
title: istio gateway
date: 2022-11-18
summary: istio gateway 구조를 알아본다.
topic: istio
published: false
tags:
  - kubernetes
  - istio
---
istio는 외부 트래픽을 kubernetes의 ingress를 통해 받지 않는다. 엑세스를 제한하고 보호해야 하므로 istio gateway를 사용한다. 경우에 따라서는 외부로 나가는 트래픽도 제한할 수 있다.

## istio ingress gateway
