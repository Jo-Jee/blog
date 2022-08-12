---
id: post-page
title: 포스트 페이지 구성
date: 2022-07-13
summary: 포스트 페이지 구성을 위한 요소들
topic: blog
published: true
tags:
  - nextjs
  - blog
  - pagination
---
## Pagination
Next.js를 사용하면서 페이지를 나누는 방법을 몇가지 생각 해봤다.

1. getStaticPaths와 getStaticProps를 사용해 페이지로 구성
2. SSR을 하지않고 api 구성 후 CSR

1번 방법은 기존에 구성을 해봤고 블로그 특성상 앞으로도 많이 할 예정이다. 또 포스트 리스트는 딱히 검색에 노출이 안돼도 상관없기 때문에 SEO가 필요없다. 또 Next.js api를 구성해보고싶기 때문에 2번으로 결정했다.

## Next.js API
Next.js가 제공하는 기능은 SEO를 위한 SSR도 있지만 자체적으로 API를 구성할 수도 있다. Express나 Nest.js만큼 많은 기능을 제공하거나 편하게 만들 수는 없지만 아주 간단하게는 만들 수 있다. 그래서 이 포스트 리스트를 내려주는 api를 구성해볼 생각이다.

## map, reduce
tag 관련 페이지에서 에러가 났는데 tags 에 빈 값이 들어가서 null return이 발생하는 문제였다. map을 사용하다보니 항상 return 값이 존재해야했다. 검색 해보니 map 전에 filter를 하라는 말도 있었지만 깔끔하지 않은 것 같아 reduce를 사요해 직접 list에 push하는 형태로 코드를 변경했다.