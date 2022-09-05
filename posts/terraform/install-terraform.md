---
id: install-terraform
title: Terraform 설치 및 환경구성
date: 2022-08-13
summary: Terraform을 설치하고 코드작성 환경을 구성한다.
topic: terraform
published: true
tags:
  - iac
  - terraform
---
## Terraform 설치
AWS에서 Terraform을 사용할 것이고 aws cli 관련 설정은 생략한다.
먼저 node나 python 처럼 Terraform도 여러 버전이 있어서 버전 관리 도구인 `tfenv`를 설치 해준다.
```shell
# tfenv 설치
brew install tfenv

#tfenv 설치 및 버전 확인
tfenv --version

# Terraform 최신 버전 설치 및 사용 버전 설정
tfenv install
tfenv use 1.2.6

# 버전 확인으로 설치 확인
terraform --version
```
이렇게 되면 terraform을 사용할 준비를 완료했다.

## Treeaform 사용 준비
Terraform을 사용할 준비를 하기 위해서 먼저 main.tf를 작성 해준다
```
provider "aws" {
  profile = "your profile"
  region = "ap-northeast-2"
}
```

그리고 관련 블러그인들을 인스톨하기 위해서 init을 해준다.
```
terraform init
```

그러면 terraform이 aws관련 플러그인들을 설치한다. 이제 Terraform을 학습할 준비가 됐다.
 