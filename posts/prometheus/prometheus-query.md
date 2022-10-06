---
id: prometheus-query
title: PromQL의 데이터타입
date: 2022-10-01
summary: PromQL의 데이터타입에 대해 알아본다.
topic: prometheus
published: true
tags:
  - prometheus
  - PromQL
---
PromQL은 Prometheus Query Language의 약자이다. 말 그대로 prometheus 쿼리용 언어이다.

## Time Series
Prometheus는 데이터를 시간 변화에따른 값으로 저장하고 [시간, 값]의 형태로 표현한다. 이 때 1개의 [시간, 값] 데이터를 sample이라고 한다. 그리고 이 sample의 배열을 tiem series라고 한다.

## Data type
Prometheus에는 자료형이 4가지가 있다.

  - Instant vector
  - Range vector
  - Scalar
  - String

각 자료형의 특징을 알아보자.

### Instant vector
Instant vector는 여러 time series에서 같은 시간대의 Sample 집합이다. metric 이름으로 쿼리를 하면 가장 최근에 가져온 데이터를 Instant vector로 가져오게 된다.

```
container_memory_working_set_bytes(container="prometheus")
```

`container_memory_working_set_bytes`는 컨테이너에서 현재 사용하고있는 메모리를 byte단위로 가져온다는 뜻이다. 뒤의 {}안에 있는 구문은 selector로 조건에 해당하는 메트릭만 가져오게 된다. prometheus에서 위 쿼리를 하게되면 결과로 아래 값을 가져올 수 있다.

```
container_memory_working_set_bytes{container="prometheus", ...}  642736128
```

메트릭 이름과 해당 메트릭의 label을 볼 수 있고 거기에 해당하는 값을 볼 수 있다. 이렇게 특정 타임스탬프의 한 값을 가져오는게 Instant vector이다. 이 쿼리의 경우는 타임스탬프가 가장 최근값이다.

### Range vector
Range vector는 쿼리 뒤에 []라는 range vector selector를 붙여서 만든다. Instant vector처럼 해당 메트릭의 값을 가져오지만 다른점은 한 값이 아니라 해당 range vector selector에 해당하는 시간동안의 값 배열을 가져온다.

```
container_memory_working_set_bytes{container="prometheus"}[5m]
```

위와 같지만 뒤에 5분동안의 메트릭을 가져오라는 range vector selector가 붙어있다. 그럼 결과는

```
container_memory_working_set_bytes{container="prometheus", ...} 644554752 @1665022077.587
                                                                616124416 @1665022093.365
                                                                611909632 @1665022133.878
                                                                636821504 @1665022165.622
                                                                638287872 @1665022191.058
                                                                653197312 @1665022223.216
                                                                666701824 @1665022253.011
                                                                666714112 @1665022280.405
                                                                666984448 @1665022317.269
                                                                666738688 @1665022346.677
```

이렇게 시간에 따라 메트릭을 가져올 수 있다.

### Scalar & String
우선 scalar는 시간값이 없는 숫자값이다. 쿼리에 아무 숫자나 입력해보면 볼 수 있다. String도 마찬가지로 시간값이 없는 문자열값이다. "test" 등 문자열쿼리를 해보면 결과로 볼 수 있는데 실제로 사용하지는 않는다고 한다.
