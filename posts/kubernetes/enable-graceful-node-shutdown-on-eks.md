---
id: enable-graceful-node-shutdown-on-eks
title: EKS의 graceful node shutdown 활성화
date: 2022-10-08
summary: EKS환경에서 graceful node shutdown을 활성화 하기위한 설정
topic: kubernetes
published: true
tags:
  - kubernetes
---
## 노드 종료
k8s 클러스터를 운영하다 보면 당연히 노드가 종료될 경우가 생긴다. 스케일링등의 이유로 노드를 새로 생성하고 종료한다. 그런데 이렇게 노드가 종료되면 내부에서 동작중이던 pod에는 문제가 없을까?

기본적으로는 문제가 있다. 노드가 종료될 때 기존의 pod가 이미 들어온 트래픽을 정상적으로 처리하고 종료할 시간 그러니까 pod에 정의돼있는 `terminationGracePeriodSeconds`를 보장받지 못한다. 그럴 경우 당연히 문제가 생길 수 있고 여러 이유로 노드 교체가 잦은 경우에는 더 자주 문제가 발생할 수 있다.

## Graceful node shutdown
다행히도 이런 이유로 k8s의 1.21에서 부터 beta이긴 하지만 `graceful node shutdown`을 지원한다. 인스턴스의 종료가 감지되면 kubelet에서 pod들을 정상적으로 종료할 동안 인스턴스 종료를 지연시킨다.

2가지 설정값이 있는데 `shutdownGracePeriod`와 `shutdownGracePeriodCriticalPods`이다. `shutdownGracePeriod`는 pod을 종료하기위해 지연시킬 전체 시간이고 `shutdownGracePeriodCriticalPods`는 그 시간 중 critical pods를 종료하는데 사용할 시간다. 이렇게 말하면 이해가 좀 어려운데 예를 들어 설명하면 `shutdownGracePeriod`를 5m 으로 설정하고 `shutdownGracePeriodCriticalPods`를 2m으로 설정하면 우선 일반적인 pod들을 3분간 종료하고 종료가 완료되지 않아도 critical pod들을 종료하는 방식이다.

## 적용
Graceful node shutdown은 systemd의 [inhibitor locks](https://www.freedesktop.org/wiki/Software/systemd/inhibit/)를 사용하기 때문에 `InhibitDelayMaxSec`을 설정해줘야 한다. logind의 conf 파일을 직접 수정할 수도 있지만 기본 파일은 손대지 않고 추가설정이 가능하기 때문에 추가로 설정해주는걸로 한다. 설정 후에는 logind를 재시작 해준다.

``` shell
mkdir /etc/systemd/logind.conf.d
cat << EOF > /etc/systemd/logind.conf.d/99-delay-max-sec.conf
[Login]
InhibitDelayMaxSec=300
EOF
sudo systemctl restart systemd-logind
```

이 후 kubelet 설정을 바꿔야한다. kubelet 설정은 `/etc/kubernetes/kubelet/kubelet-config.json`에 있다. 이 json 파일 끝에 2가지를 추가해준다. 위에서 설명한 `shutdownGracePeriod`와 `shutdownGracePeriodCriticalPods`값이다.

``` json
{
  "kind": "KubeletConfiguration",
  "apiVersion": "kubelet.config.k8s.io/v1beta1",
  ...
  "shutdownGracePeriod": "5m",
  "shutdownGracePeriodCriticalPods": "2m"
}
```

이렇게 뒤에 2가지 설정을 추가해준다. 그리고 kubelet을 재시작 해준다.

``` shell
sudo systemctl restart kubelet
```

이렇게 설정을 마치고 확인을 위해 inhibitor locks를 확인 해본다.

``` shell
sudo systemd-inhibit --list
```

결과에 kubelet이 정상적으로 출력된다면 설정이 완료됐다.

## 결론
새로 추가된 기능을 적용해본 중에 가장 번거로웠다. 좀 더 쉽게 설정할 수 있는 방법이 있었으면 좋았을텐데. 또 managed node group을 사용하고 있기 때문에 노드 교체시 EKS에서 node를 cordon하고 pod를 drain해주는 동작을 알아서 해주고 있기 때문에 이 설정이 얼마나 도움이 될 수 있을진 모르겠지만 확실히 갑작스련 종료에 어느정도 대응할 수 있을 것 같다.

## 참고
User data등에 넣어서 쉽게 적용할 수 있게 shell 스크립트로 만들었다.
``` shell
mkdir /etc/systemd/logind.conf.d
cat << EOF > /etc/systemd/logind.conf.d/99-delay-max-sec.conf
[Login]
InhibitDelayMaxSec=300
EOF

sudo systemctl restart systemd-logind

sed -i '/"apiVersion*/a \ \ "shutdownGracePeriod": "5m",\n\ \ "shutdownGracePeriodCriticalPods": "2m",' /etc/kubernetes/kubelet/kubelet-config.json
```
