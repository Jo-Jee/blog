import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { FrontMatter } from 'interfaces'
import { getAllPosts } from 'src/utils/posts'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import PostTags from 'src/components/PostTags'
import Head from 'next/head'

export default function PostPage({
  frontMatter,
  mdxSource,
}: {
  frontMatter: FrontMatter
  mdxSource: MDXRemoteSerializeResult
}) {
  return (
    <>
      <Head>
        <title>JoJee - {frontMatter.title}</title>
      </Head>
      <div>
        <h1 className="text-4xl font-black my-5">{frontMatter.title}</h1>
        <div className="my-5">
          <PostTags tags={frontMatter.tags} />
        </div>
        <p className="my-5 text-sm text-slate-700">{frontMatter.date}</p>
        <div className="prose">
          <MDXRemote {...mdxSource} />
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
    const mdxSource = await serialize(post.body)
    return {
      props: {
        frontMatter: post.frontMatter,
        mdxSource: mdxSource,
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
