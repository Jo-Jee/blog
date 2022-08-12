---
id: blog-01
title: Next.js 블로그 제작기 (1)
date: 2022-06-09
summary: 블로그 개발을 위한 프레임워크 및 모듈 선정
topic: blog
published: true
tags:
  - nextjs
  - blog
---
## 블로그 개발하기
전부터 가볍게 개인 프로젝트를 해보자고 생각만 하고 있었는데 아이디어가 없어 고민만 하다가 블로그를 직접 만들기로 하게 됐다. 배보다 배꼽이 큰 느낌으로 블로그 하나 개발하면서 이것저것 많이 해 볼 예정이다.

## 정적 사이트 생성
블로그를 위한 정적 사이트 생성 프레임워크를 여럿 찾아봤다. 가장 대표적으로 Jekyll이 있었고 이 외에도 Hugo, Hexo 등 다양한 언어 기반의 다양한 프레임워크가 있었다. 하지만 다른 기술보다 React를 공부하는 게 앞으로 도움이 될 것 같았고 블로그를 처음부터 빌드하는 것도 공부가 많이 될 것 같아서 SSR 프레임워크인 Next.js를 선택하게 됐다.

## 블로그 구성 요소들
마크다운 문서로 포스트를 관리하고 모듈은 [next-mdx-remote](https://www.npmjs.com/package/next-mdx-remote)를 사용할 예정이다. jekyll에서 사용하는 것처럼 포스트 정보를 관리하기 위해 [front-matter](https://www.npmjs.com/package/front-matter)를 사용할 예정이다.

## 마치며
첫 포스트인 만큼 테스트 성격도 조금 있어서 첫 포스팅은 짧게 마치도록 하겠다. 이후에도 꾸준히 개발할 수 있기를
