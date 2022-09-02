import axios from 'axios'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FrontMatter } from 'src/interfaces'
import PostTags from './PostTags'

interface Response {
  frontMatters: FrontMatter[]
  total: number
}

function PostRow({ frontMatter }: { frontMatter: FrontMatter }) {
  return (
    <li className="py-4">
      <Link href={`/posts/${frontMatter.topic}/${frontMatter.id}`}>
        <a className="group">
          <div className="text-3xl font-extrabold group-hover:underline">
            {frontMatter.title}
          </div>
          <div className="my-2">{frontMatter.summary}</div>
          <div className="text-sm mb-4 text-slate-700">{frontMatter.date}</div>
        </a>
      </Link>
      <PostTags tags={frontMatter.tags} />
    </li>
  )
}

export default function PostList({ tag }: { tag?: string }) {
  const [postsData, setPostsData] = useState<Response>({
    frontMatters: [],
    total: 9999,
  })
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const target = useRef(null)

  const handleEedOfPost = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!isLoading && entry.isIntersecting) {
        setPage((prev) => prev + 1)
        setIsLoading(true)
      }
    },
    []
  )

  useEffect(() => {
    axios
      .get('/api/posts', {
        params: {
          page: page,
          tag: tag,
        },
      })
      .then((res) => {
        setPostsData({
          frontMatters: [...postsData.frontMatters, ...res.data.frontMatters],
          total: res.data.total,
        })

        setIsLoading(false)
      })
  }, [tag, page])

  useEffect(() => {
    const observer = new IntersectionObserver(handleEedOfPost, {
      threshold: 0,
      root: null,
    })

    target.current && observer.observe(target.current)

    return () => {
      observer.disconnect()
    }
  }, [handleEedOfPost, target])

  return (
    <div className="container">
      <ul className="divide-y divide-slate-200">
        {postsData.frontMatters.map((frontMatter) => {
          return <PostRow frontMatter={frontMatter} key={frontMatter.id} />
        })}
      </ul>
      {page < postsData.total ? <div ref={target} /> : null}
    </div>
  )
}
