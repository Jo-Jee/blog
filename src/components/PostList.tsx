import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import PostTags from './PostTags'
import Post from '@interfaces/Post'
import api from '@utils/api'

interface Response {
  content: Post[]
  last: boolean
}

function PostRow({ post }: { post: Post }) {
  return (
    <li className="py-4">
      <Link href={`/posts/${post.id}`}>
        <a className="group">
          <div className="text-3xl font-extrabold group-hover:underline">
            {post.title}
          </div>
          <div className="my-2">{post.summary}</div>
          <div className="text-sm mb-4 text-slate-700">{post.createdAt}</div>
        </a>
      </Link>
      <PostTags tags={post.tags} />
    </li>
  )
}

export default function PostList({ tag }: { tag?: string }) {
  const [postsData, setPostsData] = useState<Response>({
    content: [],
    last: false,
  })
  const [page, setPage] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const target = useRef(null)

  const handleEndOfPost = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!isLoading && entry.isIntersecting) {
        setPage((prev) => prev + 1)
      }
    },
    []
  )

  useEffect(() => {
    if (page < 0) return
    if (!isLoading) {
      setIsLoading(true)
      api
        .get<Response>('/posts', {
          params: {
            page: page,
            size: 10,
            tag: tag,
          },
        })
        .then(async (res) => {
          setPostsData({
            content: [...postsData.content, ...res.data.content],
            last: res.data.last,
          })
        })
        .finally(() => setIsLoading(false))
    }
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(handleEndOfPost, {
      threshold: 0,
      root: null,
    })

    target.current && observer.observe(target.current)

    return () => {
      observer.disconnect()
    }
  }, [handleEndOfPost, target, isLoading])

  return (
    <div className="container">
      <ul className="divide-y divide-slate-200">
        {postsData.content.map((post) => {
          return <PostRow post={post} key={post.id} />
        })}
      </ul>
      <div>{isLoading.toString()}</div>
      <div>{page}</div>
      {!postsData.last && !isLoading && <div ref={target} />}
    </div>
  )
}
