---
id: structure-of-etcd
title: etcd의 구조
date: 2022-09-24
summary: etcd의 구조와 특징 및 동작방식에대해 알아본다.
topic: kubernetes
published: true
tags:
  - kubernetes
  - etcd
---
## etcd?
  > etcd is a strongly consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by a distributed system or cluster of machines. It gracefully handles leader elections during network partitions and can tolerate machine failure, even in the leader node.

etcd는 key-value store이고 고가용성을 큰 목표로 한다. 이런 고가용성을 확보하기 위해 etcd는 RSM 구조로 구성돼있다.

## RSM (Replicated State Machine)?
state machine replication은 서버들을 복제하고 그 서버와 클라이언트 사이의 상호작용을 조율해 장애를 허용하도록 구현하는 서비스다. 즉, 서버를 복제해서 일부 서버에 장애가 생기더라도 서비스 자체에 문제가 생기지 않도록 하는 방법이다. 이런 state machine replication 을 사용해 만들어진게 RSM이다. 이 RSM은 복제 로그를 구성해 구현한다. 복제 로그는 동일한 메세지를 동일한 순서로 저장하고 RSM은 이걸 처리한다. 각 로그는 결정론적 명령이기 때문에 수행하면 항상 동일한 상태가 된다. 쉽게 말하면 처리하면 나오는 아웃풋이 같은 로그를 같은 순서로 다 같이 받아서 다 같이 처리한다는 뜻이다.

이 RSM은 4가지 속성을 만족해야한다.
  - 네트워크에 딜레이가 있거나 패킷이 손실 혹은 중복 정송되는 등 문제가 있어도 올바른 결과를 얻을 수 있어야한다.
  - 일부 서버에 문제가 발생해도 응답해야한다.
  - 타이밍에 상관없이 일관성을 가져야한다.
  - 다수 서버가 정상이라면 일부 느린 서버가 있더라도 전체 성능에 영향없이 빠르게 응답해야 한다.

state가 있는 서버를 여러대로 분산해 놓으면 데이터를 복제하는 과정에서 여러가지 문제가 생길 수 있다. 서로 데이터가 달라지면 당연히 data store로 신뢰할 수 없고 이를 해결하기 위해 consensus algorithm을 사용한다. 직역하면 합의 알고리즘이고 정의는 한 데이터를 여러 프로세스나 시스템에서 어떻게 합의 할 것인지를 정하는 알고리즘이다. PoW, PoS등 블록체인에서 사용하는 알고리즘도 있고 Paxos등 분산 환경에서 사용하는 다른 알고리즘도 있다. etcd에서는 Raft를 사용한다.

## Raft?
Raft에서 노드는 4가지 상태를 가진다.
  - Leader: 클라이언트의 모든 요청을 수신하고 로그를 적제하며 팔로워에게 전달한다.
  - Follower: 클라이언트의 요청은 리더로 리다이렉트하고 리더의 요청은 수신해 처리한다.
  - Candidate: 새로운 리더가 되기위한 후보 상태이다.
  - Learner: 새로 멤버로 추가돼 로그를 따라잡고 있는 상태이다. (etcd 3.4.0 이후 추가)

### 리더 선출
클러스터는 term이라는 임기 값이 있다. 최초 모든 노드가 0으로 임기를 가지고 일정 기간 리더의 heartbeat를 받지 못하면 timeout이 발생한다. 그러면 임기를 1 증가하고 스스로 캔디데이트 상태로 변경한 후 다른 노드에 투표를 요청한다. 요청을 받은 노드는 현재 자신의 term과 로그를 비교해서 자신이 캔디데이트보다 큰 값을 가지고 있다면 거절한다. 이 때 클러스터의 노드 수를 기준으로 과반이 되는 값을 쿼럼이라고 하는데 투표값이 쿼럼에 도달하면 당선이 돼 리더가 된다. 아니라면 다른 노드가 리더가 되거나 동률로 결렬이 된다. 동률의 경우 timeout을 150 ~ 300ms 사이의 랜덤값으로 해 동시 투표로 결렬될 일을 줄이고 리더가 되면 다른 노드에 heartbeat를 보낸다. 이 heartbeat를 받은 노드는 자신의 term보다 받은 term이 높을 경우 term을 업데이트하고 팔로워가 된다.

### 로그 복제
각 노드는 각자 로그의 lastIndex를 가지고있다. 리더는 추가로 팔로워의 nextIndex를 가지고 있다. 사용자가 log append 요청을 하면 리더는 lastIndex 다음에 로그를 기록하고 lastIndex를 증가시킨다. 그리고 interval에 따라 heatbeat를 보낼 시간이 되면 모든 노드의 nextIndex값에 따른 로그와 함께 heartbeat를 보낸다. 이 때 쿼럼만큼 로그를 기록했다는 응답을 받으면 리더는 commit을 수행한다. 이렇게 commit이 수행되면 log append 요청한 값으로 응답을 받을 수 있다. 팔로워들은 리더가 로그를 commit했다는 것을 알게되면 각 노드의 entry에서 로그를 commit한다.

### 리더 다운
리더가 다운되면 당연히 heartbeat가 없어지고 timeout이 발생한다. 이 때 로그가 짧은 노드가 캔디데이트가 되고 heartbeat를 보내면 거절당하게 된다. 로그가 긴 노드가 timeout 됐을 때 보낸 투표요청으로 리더로 선출된다. 이 후 다운된 리더가 복구됐을 때는 term 값이 낮으므로 새로운 리더의 heartbeat에 의해 팔로워가 된다.

### 멤버 추가
etcd는 러닝상태에서 멤버를 추가할 수 있다. 새로운 노드가 추가 요청을 리더에 보내면 리더는 새로운 설정을 로그에 추가한다. 그 후 각 노드에 이 설정을 복제한다. 설정 로그는 commit이 아니라 추가된 즉시 적용된다. 노드는 현재 값을 스냅샷으로 저장하고 있는데 이 스냅샷에 현재 로그를 합쳐 추가요청을 보낸 노드에 보내준다. 그리고 새로 추가된 노드는 이 스냅샷을 통해 다른 노드와 동기화한다. 그런데 이렇게 동기화 하는 도중에 설정을 업데이트할 일이 생기면 새로 추가된 노드 때문에 쿼럼값에 도달하지 못 할 경우가 생긴다. 그래서 새로 추가중인 노드는 노드의 구성원이지만 쿼럼값에는 영향을 주지 않는 Learner 상태가 된다. 하지만 kubeadm이나 kubespray 같은 자동화 도구로 생성된 etcd는 기본적으로 러너가 비활성화 돼있다. 일반적으로 kubernetes의 경우 스냅샷의 크기가 매우 작기 때문에 이런 문제가 거의 발생하지 않기 때문이다.

또 etcd는 아직 commit되지 않은 설정이 있으면 새로운 설정을 적용할 수 없는데 로그 엔트리에 있는 최신 설정을 기준으로 적용하기 때문에 설정 로그가 여러 노드에 최신화가 안돼있을 수 있다. 그래서 이렇게 한 클러스터에 여러 설정이 있는것을 막기위해 etcd는 새로운 설정이 commit되기 전에는 새로운 설정을 추가하지 않는다.

### 멤버 삭제
팔로워 삭제시에는 큰 문제가 되지 않지만 만약 리더를 삭제하려고 하면 자신을 삭제한 설정을 로그 엔트리에 추가하고 자기자신을 제외하고 쿼럼만큼 응답을 받은 후에 commit한다. 작업 도중 write가 발생하면 똑같이 자신을 제외하고 쿼럼만큼 응답을 받았을 때 commit한다.  이 후 리더는 heartbeat 송신을 중단하고 timeout이 발생한 다른 팔로워가 리더가 된다.

## 결론
이렇게 etcd와 Raft 알고리즘에 대해 알아보았다. control plain의 DB인 만큼 중요한 서비스이고 구조를 잘 알고 있으면 추후 운영에 많은 도움이 될 수 있을 것 같다.
