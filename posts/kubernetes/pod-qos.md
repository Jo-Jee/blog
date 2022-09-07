---
id: pod-qos
title: Pod QoS
date: 2022-09-05
summary: Pod의 QoS에 대해 알아본다
topic: kubernetes
published: true
tags:
  - kubernetes
---
## QoS?
QoS(Quality of Service)는 pod의 서비스 품질 클래스이다. node의 자원이 부족해지면 pod를 제거해야하는 상황이 올 수 있는데 이럴 때 우선순위가 존재하고 이 우선순위를 정하기 위한 클래스이다. container의 cpu, memory에 대한 request와 limit에 따라 정해지며 아래 3가지가 있다.

- BestEffort
- Burstable
- Guaranteed

## Guaranteed
pod이 제거되는 상황에 가장 우선순위가 낮은 pod로 이 클래스의 pod는 제거될 확률이 낮다고 볼 수 있지만 조건을  만족해야 Guaranteed 클래스를 할당받을 수 있다. 바로 cpu, memory의 request, limit가 각 container에 정의 돼있고 각각 cpu, memory 의 request와 limit가 일치해야 한다.

## Burstable
Guaranteed의 조건은 만족하지 못하지만 최소 하나의 container가 cpu나 memory의 request, limit가 정의돼 있으면 Burstable 클래스가 할당된다. 모두 정의가 돼있더라도 request보다 limit가 높게 설정돼있으면 Burstable 클래스가 할당된다.

## BestEffort
memory와 cpu request와 limit가 없는 상태이다.

## Pod 우선순위
우선 기본적으로 각 클래스마다 추출할 때 우선순위는 Guaranteed < Burstable < BestEffort 이다. 하지만 이것과 별개로 memory 사용량이 많을수록 추출 우선순위가 올라간다. 그래서 Guaranteed와 다르게 Burstable과 BestEffort 사이에는 역전이 일어날 수 있다. 즉 Burstable의 memory 사용량이 너무 많으면 BestEffort보다 먼저 추출될 수 있다.

이런 할당 우선순위를 알고있으면 안정적으로 운영하는데 도움이 될 것 같아 정리 해보았다.
