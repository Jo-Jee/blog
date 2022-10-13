---
id: seo
title: Next.js 블로그에 SEO하기
date: 2022-10-13
summary: Next.js로 만든 블로그에 SEO를 하기위한 설정에 대해 알아보고 실제 적용해본다.
topic: blog
published: true
tags:
  - nextjs
  - blog
  - seo
---
## SEO
Search Engine Optimization의 약자로 써있는 그대로 검색엔진 최적화이다. 구글이나 네이버 등 검색엔진들에서 검색해서 나오는 내용들은 그 서비스에서 크롤링해서 보여주는 내용들이다. 그래서 SEO를 한다는건 이런 검색엔진에서 내 페이지를 잘 가져갈 수 있게 안내해주는 거라고 생각하면 편하다.

구체적으로 SEO를 하기 위해서는 아래의 4가지 처리가 필요하다.

  - robots.txt 구성
  - XML Sitemaps 구성
  - meta tags 구성
  - canonical tags 구성

## robots.txt 구성
robots.txt는 사이트의 루트에 위치해야한다. 즉, `도메인/robots.txt`에 get 요청을 하면 받아볼 수 있어야한다.

```
User-agent: *
Disallow: /not-allowed
Allow: /not-allowed/allowed

User-agent: Yeti
Disallow: /not-allowed-for-naver/

Sitemap: https://example.com/sitemap.xml
```

기본적으로 `robots.txt`에 명시되지 않은 부분은 허용하는걸로 본다. `User-agent` 부분은 어떤 user agent에 해당 설정을 반영할지에 대한 설정이다. 위 예제에서는 모든 user agent에 대해 적용하는 부분과 네이버만 따로 적용하는 부분을 정의한다.

`Disallow`는 허용하지 않을 경로다. 위 예제에서는 `/not-allowed`는 허용하지 않는 경로이다. `/not-allowed`밑의 모든 경로를 가져가지 말라는 뜻이다.

`Allow`는 허용할 경로이다. 앞에서 말했듯이 명시하지 않은 부분은 허용하는걸로 보는데 위 예제처럼 허용하지 않은 부분 중 따로 가져가도 되는 페이지가 있다면 `Allow`로 명시해준다. 위 예제에서는 `/not-allowed`로 시작하는 경로 중 `/not-allowed/allowed` 로 시작하는 모든 경로에 대해 허용한다는 뜻이다.

예제에서 알 수 있듯이 `robots.txt`는  어떤 검색엔진 크롤러들이 어떤 페이지를 가져갈지 알려주기위해 구성해야한다. 크롤러들이 크롤링하는 양에는 제한이 있고 이 때 우리가 검색엔진에 보여주고싶은 부분들을 잘 보여주기 위해 잘 구성해야한다.

Next.js에서는 public directory에 `robots.txt` 파일을 하나 추가하는걸로 쉽게 구성할 수 있다.

## XML sitemaps
`robots.txt`에서 간단하게 어떤 경로를 가져가고 어떤 경로를 못 가져가게할지 보여줬다면 `sitemap`은 좀 더 디테일한 정보를 전달한다. 크롤러가 가져갔으면 하는 페이지를 자세히 알려줄 수 있다. 트래픽이 많고 변경이 적은 서비스의 경우 배치를 통해 사이트맵을 업데이트하고 캐시하면 성능에 많은 도움이 되겠지만 이 블로그에서는 간단하게 처리해볼 예정이다.

먼저 xml을 만들고 내려주는 api를 구성한다.

``` ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from 'src/utils/posts'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/xml')

  const posts = getAllPosts()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${posts
                  .map((post) => {
                    return `
                    <url>
                        <loc>${`https://blog.jojee.co.kr/${post.frontMatter.id}`}</loc>
                    </url>
                    `
                  })
                  .join('')}
                </urlset>
                `

  res.end(xml)
}
```

블로그에서 포스팅된 부분만 크롤링해주면 되기 때문에 포스트 url만 추가했다. 그리고 이 xml을 `/sitemap.xml`로 가져갈 수 있게 redirect 해준다.

```
const nextConfig = {
  ...
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      }
    ]
  },
}

module.exports = nextConfig
```

이렇게 sitemap 구성을 완료했다.

## meta tag 구성
meta tag는 HTML 컨텐츠가 아닌 정보를 담기위해 사용하는 tag다. `<head>`에 정의해서 사용하며 이 meta tag의 내용을 크롤러가 읽고 검색엔진에 적용한다. 이 블로그에서는 포스트만 검색엔진이 잘 가져가주면 되기 때문에 post 페이지에 Next.js에서 제공하는 HEAD 태그를 추가하고 내용을 넣어준다.

``` tsx
<Head>
  <title>{frontMatter.title} - JoJee</title>
  <meta name="keywords" content={frontMatter.tags.join(', ')} />
  <meta name="author" content="JoJee" />
  <meta name="description" content={frontMatter.summary} />
</Head>
```

## canonical tag 구성
이제 마지막으로 canonical tag를 구성하는 부분이 남았다. canonical tag는 중복 페이지를 관리하기 위한 tag다. 예를들어 example.com과 www.example.com이 같은 페이지를 보여준다면 크롤러 입장에서는 같은 페이지를 여러번 크롤링하는 것이므로 비효율적이고 자체적으로 크롤링 빈도를 줄인다. 그런데 우리가 실제 보여주기 위한 페이지가 example.com 인데 크롤러는 www.example.com을 크롤링하고 example.com의 빈도를 줄이면 우리가 원하는 검색결과의 인덱싱이 늦어지게 된다. 또 모바일과 PC웹이 분리돼있는 경우 등 여러 이유로 중복이 일어날 수 있는데 어느 페이지가 우리가 가진 원본페이지인지 정의하는 부분이 canonical tag이다.

이 블로그에는 해당 이슈가 없어서 따로 처리하지는 않았다.

## 결론
이렇게 블로그에 직접 SEO를 적용하면서 정리해봤다. 앞으로 며칠간 실제로 구글이나 네이버에서 검색이 잘 되는지 모니터링 해봐야겠다.
