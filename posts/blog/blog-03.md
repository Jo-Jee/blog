---
id: blog-03
title: Next.js 블로그 제작기 (3)
date: 2022-07-08
summary: front matter 추출 모듈 결정
topic: blog
published: true
tags:
  - nextjs
  - blog
  - frontmatter
---
## Front Matter
포스트에 내용 이외에 제목, 태그 등 여러가지 특수한 정보들이 있을 수 있는데 jekyll에서는 이걸 front matter라는걸로 관리 했었다. next-mdx-remote에도 front matter 기능이 있지만 사용하기 불현했고 비슷하게 수행할 수 있는 모듈이 있나 찾아봤는데 2가지를 발견했다.

1. [gray-matter](https://www.npmjs.com/package/gray-matter)
2. [front-matter](https://www.npmjs.com/package/front-matter)

도구를 결정할 때 보통 star와 마지막 커밋 날짜를 보는데 둘 다 1년이 넘어서 날짜는 의미가 없고 star는 gray-matter 쪽이 훨씬 많았다. 하지만 front-matter쪽이 interface 를 통해 타입 관리하기가 더 편하게 돼있어서 front-matter로 결정했다.

## NextJs
[getStaticPaths](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths)를 사용해 포스트별 path를 구성하고 간단하게 내용을 뿌리는 부분까지 구현해볼 예정이다. fallback 옵션은 백앤드의 캐싱 옵션과 비슷한거 같은데 미리 빌드 해놓고 나머지는 404로 내려주는 false, 미리 빌드되지 않은 부분은 fallback 페이지를 보여줬다가 완료되면 랜더링된 페이지로 넘어가는 true, 그냥 보통 SSR처럼 랜더링하는 동안 서버 로딩 상태로 있다가 페이지를 보여주는 blocking 옵션이 있는 듯 하다. 난 포스트 추가할 때마다 배포를 새로할 예정이기 때문에 false 옵션을 사용할 예정이다.

## Blog
블로그 구조는 원래 날짜별로 post를 분류할 생각이었는데 주제별로 분류하는게 관리 측면에서 장점이 많을 것 같아서 구조를 변경했다.