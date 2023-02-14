import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import PostTags from 'src/components/PostTags'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import api from '@utils/api'
import Post from '@interfaces/Post'
import format from '@utils/timeago'
import { useEffect, useState } from 'react'

export default function PostPage(props: { post: Post }) {
  const { post } = props
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    const key = `v-${post.id}`

    if (localStorage.getItem(key) !== null) {
      api.get<number>(`/posts/${post.id}/viewcount`).then((res) => {
        setViewCount(res.data)
      })
      return
    }

    localStorage.setItem(key, '')
    api.put<number>(`/posts/${post.id}/viewcount`).then((res) => {
      setViewCount(res.data)
    })
  }, [])

  if (!post) return <div>Loading..</div>

  return (
    <>
      <Head>
        <title>{post.title} - JoJee</title>
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta name="author" content="JoJee" />
        <meta name="description" content={post.summary} />
      </Head>
      <div>
        <h1 className="text-4xl font-black my-5 dark:text-white">
          {post.title}
        </h1>
        <div className="my-5">
          <PostTags tags={post.tags} />
        </div>
        <div className="flex my-5 text-sm text-gray-700 dark:text-gray-300/80">
          <span className="flex text-gray-700 dark:text-gray-300/80">
            조회수 {viewCount ? viewCount : post.viewCount}회
          </span>
          <span className="mx-1">·</span>
          <span>{format(post.publishedAt)}</span>
        </div>
        <div className="max-w-none prose dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const res = await api.get<number[]>('/posts/ids')

  const paths = res.data.map((id) => {
    return {
      params: {
        id: id.toString(),
      },
    }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

interface Params extends ParsedUrlQuery {
  id: string
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { id } = params as Params

  try {
    const res = await api.get<Post>(`/posts/${id}`)

    if (res.status != 200) throw Error()

    return {
      props: {
        post: res.data,
      },
    }
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    }
  }
}
