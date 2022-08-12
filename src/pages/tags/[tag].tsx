import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import PostList from 'src/components/PostList'
import { Post } from 'src/interfaces'
import { getAllPosts, getAllTags } from 'src/utils/posts'

export default function TagPostPage({ posts }: { posts: Post[] }) {
  return <PostList posts={posts} />
}

interface IParams extends ParsedUrlQuery {
  tag: string
}

export function getStaticPaths() {
  const tags = getAllTags()

  const paths = tags.map((tag) => {
    return {
      params: {
        tag: tag.name,
      },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export function getStaticProps({ params }: GetStaticPropsContext) {
  const posts = getAllPosts()
  const { tag } = params as IParams

  const taggedPosts = posts.filter((post) =>
    post.frontMatter.tags.includes(tag)
  )

  if (taggedPosts)
    return {
      props: {
        posts: taggedPosts,
      },
    }
  else
    return {
      props: {
        notFound: true,
      },
    }
}
