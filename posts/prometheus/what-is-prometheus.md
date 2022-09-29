---
id: what-is-prometheus
title: Prometheus란?
date: 2022-09-27
summary: Prometheus의 구성요소와 특징에 대해 알아본다.
topic: prometheus
published: true
tags:
  - kubernetes
  - monitoring
  - prometheus
---
## Prometheus?
  > Power your metrics and alerting with the leading open-source monitoring solution.

Prometheus는 홈페이지의 소개문구에서도 알 수 있듯이 metric을 모니터링하고 알림을 보내는 오픈소스이다. 그럼 Telegraf + influxDB 스택이 생각나는데 이런 일반적인 모니터링 툴과의 가장 큰 차이는 Push 방식이 아니라 Pull 방식이라는 점이다. 대부분 모니터링 도구들은 DB에 직접 지표를 Push하고 DB는 그걸 받아 저장하는 형태로 돼있다.

이런 형태에서는 서비스가 많아지고 Push하는 데이터의 양이 많아지면 데이터를 쌓는 쪽에 과부하가 걸릴 수 있고 장애로 이어질 수 있다. 이걸 해결하려면 일정 기간을 두고 벌크로 업데이트 하는 등 metric을 보내는 클라이언트 쪽 작업이 필요하게 된다.

Prometheus는 Pull 방식을 사용한다. 클라이언트가 엔드포인트를 노출하면 Prometheus가 metric을 가져가는 형태이다. 당연히 metric과 클라이언트가 너무 많아지면 과부하 문제가 있지만 Pull 주기 등을 Prometheus쪽에서 컨트롤할 수 있어서 관리가 쉬워진다.

이런 구조에서 기존과 또 다른점은 metric을 수집하는 Prometheus쪽에서 클라이언트를 찾아야 한다는 점이다. 이를 위해 Service Discovery가 필요한데 여기에 있는 정보를 기준으로 모니터링 대상을 찾고 Pull한다.

## Prometheus 구조
  - Prometheus Server: metric을 Pull하고 TSDB에 저장하는 서버
  - Exporter: 모니터링할 대상의 metric을 수집하고 /metrics라는 HTTP 엔드포인트를 노출해 서버가 Pull할 수 있게 한다.
  - Pushgateway: 수명주기가 짧은 배치성 작업등 Pull 방식을 사용하면 데이터 유실이 발생할 가능성이 있는 경우 Push 방식으로 metric을 보낼 수 있고 이런 데이터를 쌓아놓을 수 있는 컴포넌트.
  - Alert Manager: 특정 규칙에 따라 알림을 보내는 서버

## 결론
기본 구조에 대해 알아봤다. 기본 구조에서 알 수 있듯이 Pull 방식을 사용하기 때문에 대용량 서비스에서 부하를 조절하기 쉽고 어떤 컴포넌트의 정보를 수집할지 서버에서 정할 수 있기 때문에 Prometheus를 나누는 등 러닝상태에서 모니터링 형태를 변경하기도 쉽다. 또 Prometheus가 Prometheus를 Pull 할 수도 있기 때문에 설계를 잘 하면 부하 및 데이터 분산 처리를 잘 할 수 있다.
