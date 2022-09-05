---
id: what-is-terraform
title: Terraform이란?
date: 2022-07-30
summary: iac와 Terraform에 대해 간단히 알아보자
topic: terraform
published: true
tags:
  - iac
  - terraform
---
## IaC?
현재는 많은 서비스들이 클라우드 환경에서 동작하고 있고 이 클라우드 환경의 장점 중 하나는 직접 하드웨어를 관리할 필요가 없다는 것이다. 이게 가능한 이유는 클라우드 업체들이 실제 하드웨어를 가상화해서 제공해주기 때문이다. 이렇게 가상화된 하드웨어를 코드 즉 문서를 통해서 관리하기 위해 나온 개념이 Iac이다. 이런 IaC를 적용하면 배포 속도 향상이나 휴먼 에러 감소, 일관성 향상 등 장점이 많다고 하는데 이건 직접 겪어봐야 어느정도 장점인지 또 단점은 없는지 알 수 있을 것 같기 때문에 계속 공부를 하면서 알아보도록 하자.

## Terraform이란?
Terraform은 HashiCorp에서 만든 IaC(Infrastructure as Code)툴이다. HashiCorp에서 만들었지만 오픈소스로 개발 중이다. on-perm이나 클라우드 모두에서 사용 가능하고 HCL(Hashicorp Configuration Language)이라는 문법을 사용해 사람이 읽을 수 있는 형태로 인프라를 코드화 하고 관리한다.

## Terraform 워크플로우
Terraform은 2단계를 거쳐 리소스를 관리하는데 이 단계는 아래와 같다.
  - Write: HCL문법으로 리소스를 코드로 정의한다.
  - Plan: Terraform이 내가 정의한 문서를 기반으로 현재 infrastructure 에서 create, update, destroy에 관한 계획을 짠다.
  - Apply: 확인이 완료되면 위 Plan에서 계획한대로 적용한다.

Plan으로 실제 어떻게 적용될지 알 수 있기 때문에 사고를 줄일 수 있고 예측이 가능하다.
