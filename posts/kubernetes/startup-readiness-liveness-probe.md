---
id: startup-readiness-liveness-probe
title: startup, readiness, liveness probe 순서 및 initial delay
date: 2022-09-16
summary: startup, readiness, liveness probe의 동작순서의 모호한 점을 실험해본다.
topic: kubernetes
published: true
tags:
  - kubernetes
  - startup probe
  - readiness probe
  - liveness probe
---
## Probe
pod 내의 container의 상태를 지속적으로 체크하기 위해 kubernetes에서 제공하는 기능이다. 3가지가 있고 간단히 하면 다음과 같다.

- startup probe: container가 시작할 때 확인하는데 이 startup probe가 성공해야 다른 probe를 진행한다.
- readiness probe: container가 트래픽을 정상적으로 처리할 수 있는지 확인한다.
- liveness probe: container의 프로세스가 정상적인 상태인지 확인한다.

## startup probe
비교적 나중에 추가됐다. initial delay는 처음 probe를 하기전에 container에 유예시간을 주는데 livness 같은 경우 실패하면 pod를 재시작하기 때문에 initial delay를 여유있게 줘야하는 상황이 있었는데 그럴 때 최초 1회 성공까지 기다려주는 probe로 사용할 수 있다.

## readiness probe
container가 트래픽을 제대로 저리할 수 있는지 체크한다. 이 probe를 통과하면 트래픽을 이 pod에 보낸다.

## liveness probe
프로세스가 정상인지 확인한다. 비정상으로 판정되면 pod를 재시작한다.

## readiness vs liveness
그럼 liveness는 initial delay 등으로 아직 체크하지 않고 readiness만 통과한 경우라면 어떻게 될까? 그냥 정상적으로 트래픽이 흘러간다. liveness는 체크하지 않으면 아무 동작을 하지않고 readiness는 체크하지 않으면 트래픽을 막는다.

## startup and initail delay
startup probe는 readiness와 liveness probe를 막는다. startup probe가 성공해야 다른 probe를 실행하는데 그럼 initial delay는 어떨까? 처음 생각은 startup probe 이후에 initial delay가 있고 probe를 진행할 거라고 생각했다. 그런데 initial delay는 startup probe 동안에도 count하는 듯이 동작했다. 듯이라고 한 이유는 매번 시간에 조금씩 차이가 있었다. 확실한건 startup probe를 하는 동안에도 initial delay는 count 하는게 맞다.
