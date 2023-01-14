import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import PostTags from 'src/components/PostTags'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import api from '@utils/api'
import Post from '@interfaces/Post'

export default function PostPage(props: any) {
  const { post } = props
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
        <h1 className="text-4xl font-black my-5">{post.title}</h1>
        <div className="my-5">
          <PostTags tags={post.tags} />
        </div>
        <p className="my-5 text-sm text-slate-700">{post.createdAt}</p>
        <div className="max-w-none prose">
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
