import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { FrontMatter } from 'interfaces'
import { getAllPosts } from 'src/utils/posts'
import PostTags from 'src/components/PostTags'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function PostPage({
  frontMatter,
  body,
}: {
  frontMatter: FrontMatter
  body: string
}) {
  return (
    <>
      <Head>
        <title>{frontMatter.title} - JoJee</title>
        <meta name="keywords" content={frontMatter.tags.join(', ')} />
        <meta name="author" content="JoJee" />
        <meta name="description" content={frontMatter.summary} />
      </Head>
      <div>
        <h1 className="text-4xl font-black my-5">{frontMatter.title}</h1>
        <div className="my-5">
          <PostTags tags={frontMatter.tags} />
        </div>
        <p className="my-5 text-sm text-slate-700">{frontMatter.date}</p>
        <div className="max-w-none prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      </div>
    </>
  )
}

export function getStaticPaths() {
  const posts = getAllPosts()

  const paths = posts.map((post) => {
    return {
      params: {
        topic: post.frontMatter.topic,
        id: post.frontMatter.id,
      },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  topic: string
  id: string
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const posts = getAllPosts()
  const { id } = params as IParams

  const post = posts.find((p) => p.frontMatter.id === id)

  if (post) {
    return {
      props: {
        frontMatter: post.frontMatter,
        body: post.body,
      },
    }
  } else {
    return {
      props: {
        notFound: true,
      },
    }
  }
}
