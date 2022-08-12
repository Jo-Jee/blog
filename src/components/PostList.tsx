import axios from 'axios'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { FrontMatter } from 'src/interfaces'

interface Response {
  frontMatters: FrontMatter[]
  total: number
}

function PostRow({ frontMatter }: { frontMatter: FrontMatter }) {
  return (
    <div>
      <Link href={`/posts/${frontMatter.topic}/${frontMatter.id}`}>
        <a>{frontMatter.title}</a>
      </Link>
      <div>{frontMatter.summary}</div>
      <div>{frontMatter.date}</div>
      {frontMatter.tags.map((tag) => {
        return (
          <Link href={`/tags/${tag}`} key={`${frontMatter.id}-${tag}`}>
            <a>{tag}</a>
          </Link>
        )
      })}
    </div>
  )
}

export default function PostList({ tag }: { tag?: string }) {
  const [res, setRes] = useState<Response>({
    frontMatters: [],
    total: 0,
  })
  const [curPage, setCurPage] = useState(1)
  const perPage = 5
  const totalPage = res.total / perPage

  useEffect(() => {
    axios
      .get('/api/posts', {
        params: {
          page: 1,
          tag: tag,
        },
      })
      .then((res) => {
        setRes(res.data)
      })
  }, [tag])

  return (
    <div>
      <div>
        {res.frontMatters.map((frontMatter) => {
          return <PostRow frontMatter={frontMatter} key={frontMatter.id} />
        })}
      </div>
    </div>
  )
}
