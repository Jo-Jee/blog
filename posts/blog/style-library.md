---
id: style-library
title: style 라이브러리 비교 및 결정
date: 2022-07-19
summary: sass, styled-component, Tailwind css Theme UI 비교
topic: blog
published: true
tags:
  - nextjs
  - blog
  - style
  - sass
  - styled-component
  - tailwindcss
  - theme ui
---
## Sass
sass, scss는 기존 css를 개선하는 느낌이 강한 라이브러리다. 기존 불편사항들을 개선은 해주지만 근본적으로 해결은 해주지 못 하는 부분들이 있어서 고려하지 않았다.

## styled-component
사용해보진 않았지만 컴포넌트마다 독립적으로 스타일을 주입하고싶어서 처음엔 굉장히 긍정적으로 고려했다. 하지만 실제 사용 후기를 보니 작은 마진 하나 추가해야할 때도 컴포넌트를 새로 만들어줘야 해서 불편한 점이 많은 것 같았다.

## tailwindcss
utility first 컨셉이라 하는데 미리 각 스타일 요소마다 css class name이 정해져있고 가져다 쓰는 형태이다. bootstrap을 좀 더 자유롭게 사용할 수 있다고 하는게 제일 가까운 느낌이었다. 컴포넌트 하나에 여러 스타일이 들어갈 때 너무 길어질 것 같고 분명 잘 사용하지 않는 속성들을 쓸 일이 있을 때 찾아보는 수고가 필요할 것 같았다. 하지만 자동완성 지원이 잘 되고 처음에 잘 배워놓으면 빠르게 개발할 수 있을 것 같았다.

## Theme UI
컴포넌트에 직접 오브젝트 형태로 스타일을 주입할 수 있는데 일단 첫 눈에는 제일 편리해 보였다. 하지만 사용자가 너무 적어서 삽질을 많이 해야할 것 같았다.

## 결론
종합적으로 봤을 때 tailwind vs Theme UI 였는데 사용자 수때문에 tailwind를 사용하기로 결정했다.
