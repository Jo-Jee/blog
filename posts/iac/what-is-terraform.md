---
id: what-is-terraform
title: Terraform 입문하기
date: 2022-07-22
summary: Terraform이란 무엇인지와 Terraform사용을 위한 환경을 구성해보자
topic: iac
published: false
tags:
  - kubernetes
  - kubespray
  - kubeadm
  - kops
---
## IaC?
현재는 많은 서비스들이 클라우드 환경에서 동작하고 있고 이 클라우드 환경의 장점 중 하나는 직접 하드웨어를 관리할 필요가 없다는 것이다. 이게 가능한 이유는 클라우드 업체들이 실제 하드웨어를 가상화해서 제공해주기 때문이다. 이렇게 가상화된 하드웨어를 코드 즉 문서를 통해서 관리하기 위해 나온 개념이 Iac이다. 이런 IaC를 적용하면 배포 속도 향상이나 휴먼 에러 감소, 일관성 향상 등 장점이 많다고 하는데 이건 직접 겪어봐야 어느정도 장점인지 또 단점은 없는지 알 수 있을 것 같기 때문에 계속 공부를 하면서 알아보도록 하자.

## Terraform이란?
Terraform은 HashiCorp에서 만든 IaC(Infrastructure as Code)툴이다. HashiCorp에서 만들었지만 오픈소스로 개발 중이다. HCL(Hashicorp Configuration Language)이라는 문법을 사용한다. 이 문법을 사용해서 3가지 단계를 거쳐 리소스를 관리하는데 이 단계는 아래와 같다.
  - Write: 리소스를 정의한다.
  - Plan: Terraform이 내가 정의한 문서를 기반으로 현재 infrastructure 에서 create, update, destroy에 관한 계획을 짠다.
  - Apply: 확인이 완료되면 적용한다.
이제 실습 할시간!

## Terraform 설치
AWS에서 Terraform을 사용할 것이고 aws cli 관련 설정은 생략한다.
먼저 node나 python 처럼 Terraform도 여러 버전이 있어서 버전 관리 도구인 `tfenv`를 설치 해준다.
```shell
# tfenv 설치
brew install tfenv

#tfenv 설치 및 버전 확인
tfenv --version
# tfenv 3.0.0

# Terraform 최신 버전 설치
tfenv install
tfenv list
# 1.2.6
tfenv use 1.2.6

terraform --version
# Terraform v1.2.6
# on darwin_amd64
```