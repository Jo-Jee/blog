---
title: Next.js 블로그 제작기 (2)
date: 2022-07-04
summary: 포스트 페이지 구성을 위한 mdx 라이브러리 결정
tags:
  - nextjs
  - blog
  - mdx
---
##Markdown
블로그를 작성하기 위해서 포스팅을 간편하게 해줄 포멧이 필요했고 전에 회사에서 jekyll기반 블로그를 사용해봤기 때문에 큰 고민없이 마크다운으로 작성하기로 했다. 하지만 Next.js는 jekyll처럼 .md 파일을 랜더링 해주는 라이브러리가 포함돼있지 않기 때문에 mdx 랜더링을 위해 몇가지 작업이 필요했다.
##라이브러리
가장 먼저 Next.js 공식문서에서는 [@next/mdx](https://www.npmjs.com/package/@next/mdx)를 소개하고 있다. 공식문서에 있기때문에 확인을 해봤다. 또 Terraform, Vault등을 만든 [hashicorp](https://github.com/hashicorp)의 [next-mdx-enhanced](https://github.com/hashicorp/next-mdx-enhanced), [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)도 알아봤다. 마지막으로 [mdx-bundler](https://github.com/kentcdodds/mdx-bundler)가 유명한거 같아서 총 4가지를 비교하게 됐다.
##@next/mdx
@next/mdx의 경우 아무래도 Next.js를 만든 Vercel에서 직접 관리하는 mdx 라이브러리이다보니 가장 관심이 갔다. 서드파티가 편하더라도 결국 공식지원하는 라이브러리로 돌아간 경험이 많아서 웬만하면 이 라이브러리를 사용할 생각이었다. .mdx파일을 바로 페이지로 랜더링 할 수 있는 점은 좋았지만 페이지를 커스텀 하려면 .mdx 파일 내에 export 구문을 사용하는등 귀찮은 작업이 필요해서 내가 원하는 사용성에는 맞지 않는걸로 보였다.
##next-mdx-enhanced
hashicorp에서 만들었고 현재는 개량한 버전인 next-mdx-remote 사용을 권장한다.
##next-mdx-remote
next-mdx-remote는 위에서 말했듯 next-mdx-enhanced의 개량버전 같은 느낌이다. 하지만 사용법은 많이 다른데 위 프로젝트들이 .mdx파일을 직접 페이지로 만들고 레이아웃을 지정하는 느낌이라면 이 라이브러리는 페이지에서 직접 .mdx파일의 내용을 불러오고 랜더링하는 느낌이라서 프로젝트에 추가 설정도 필요없고 간편했다. 또 커스터마이징이 편하다는 장점도 있었다.
##mdx-bundler
mdx-bundler는 next-mdx-remote에서 지원하지 않는 mdx 번들링 기능도 지원하고 있다. 하지만 블로그라는 특성 때문에 mdx 파일을 사용하기 보다는 md 파일과 frontmatter를 파싱해주는 기능만 있으면 되기 때문에 큰 장점은 아니다. 어차피 next를 사용할 생각이고 mdx-bundler를 사용하려면 esbuild가 추가로 필요해지는 등 다른 추가사항들이 있어서 사용하지 않을 예정이다.
##결론
사실 어떤 라이브러리를 사용해도 블로그 정도의 사용성은 다 가능하다. 현재 상황을 고려했을 때 딱 알맞은 사용성을 가진게 bun-mdx-remote라고 생각돼서 bun-mdx-remote로 결정!