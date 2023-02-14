import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import PostTags from './PostTags'
import Post from '@interfaces/Post'
import api from '@utils/api'
import format from '@utils/timeago'

interface Response {
  content: Post[]
  last: boolean
}

function PostRow({ post }: { post: Post }) {
  return (
    <li className="py-4">
      <Link href={`/posts/${post.id}`}>
        <a className="group dark:text-slate-100">
          <div className="text-3xl font-extrabold group-hover:underline">
            {post.title}
          </div>
          <div className="my-2">{post.summary}</div>
          <div className="flex text-xs my-1 text-gray-700 dark:text-gray-300/80">
            <span className="flex text-gray-700 dark:text-gray-300/80">
              조회수 {post.viewCount}회
            </span>
            <span className="mx-1">·</span>
            <span>{format(post.publishedAt)}</span>
          </div>
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
      <ul className="divide-y divide-slate-200 dark:divide-stone-500">
        {postsData.content.map((post) => {
          return <PostRow post={post} key={post.id} />
        })}
      </ul>
      {!postsData.last && !isLoading && <div ref={target} />}
    </div>
  )
}
