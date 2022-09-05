---
id: terraform-module
title: Terraform module 사용법
date: 2022-08-13
summary: Terraform의 module을 사용하는 방법에 대해 알아본다.
topic: terraform
published: false
tags:
  - iac
  - terraform
---
## kubespray를 위한 terrafrom 정의
k8s 환경 구성을 위해 kubespray를 사용하기 위해서 인프라가 구성이 돼있어야한다. 이 인프라를 terraform으로 구성할 계획이다.

## Module이란?
Module은 여러 `.tf` 혹은 `.tf.json` 파일들이 한 directory에 위치하는 단위이다. Module은 resource를 묶어서 재사용하기위해 사용한다.
  - Root module: main working directory에 존재하는 module로 모든 환경에서 하나씩은 가지고 있는 module이다.
  - Child module: Terraform module이 불러서 사용할 수 있는 다른 module이다.
  - Publicshed Module: public이나 private registry에 배포해서 로컬로 가져와 사용할 수 있는 module이다.

VPC, EC2등 많은 리소스를 생성할 예정이기 때문에 각각을 모듈화해서 관리한다.

## VPC

