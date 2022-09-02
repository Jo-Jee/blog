---
id: infinite-scroll
title: React로 무한스크롤 구현하기
date: 2022-07-19
summary: 포스트리스트 무한스크롤 구현하기
topic: blog
published: true
tags:
  - nextjs
  - blog
  - pagination
  - infinite scroll
---
## Pagination 방식
api에서 offset으로 page number를 내려주는것 까지는 구현했다. 이제 실제로 페이지에 뿌리는 부분을 구현해보려고 하는데 기존에 게시판들에서 볼 수 있었던 숫자 페이지 방식보다는 사용자 입장에서 infinite scroll이 더 편할 것 같기도 하고 개인적으로 개발하는것도 더 재밌을 것 같아서 구현해보기로 결정했다.

## infinite scroll 방식
찾아보니 기본적으로 아래 2가지 방식이 있다.

1. Scroll event
2. Intersection Observer

각 방식의 장단점을 알아보자.

### Scroll event
그냥 맨 처음 아무것도 알아보기 전에 생각했던 방법이다. 그 만큼 직관적으로 만들 수 있을 것 같다. 하지만 조금 찾아보니 스크롤을 할 때마다 실행이돼서 성능이슈가 있을 수 있다고 한다. 그래서 몇가지 작업을 해주면 최적화가 가능하기는 한데 권장하는 방법은 아니다.

### Intersection Observer
현재 많이 사용하는 방식인 것 같은데 전에 동료 FE개발자에게 물어봤을 때도 이걸 사용한다고 했다. 찾아보니 특정 뷰포트와 요소가 겹쳐지는 이벤트를 보는걸로 현재 화면에 해당 요소가 있는지 아닌지를 판단할 수 있다. 따라서 특정 요소가 화면에 보이면 데이터를 가져올 수 있다. 단점은 브라우저가 지원을 해야해서 polyfill이 필요할 수 있다.

## 결론
종합적으로 판단했을 때 Intersection Observer를 사용하는게 더 좋겠다고 판단해서 Intersection Observer로 구현
