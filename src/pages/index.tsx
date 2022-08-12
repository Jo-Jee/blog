import type { GetStaticProps } from 'next'
import PostList from 'src/components/PostList'
import { Post } from 'src/interfaces'
import { getAllPosts } from 'src/utils/posts'

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      <PostList posts={posts} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = getAllPosts()

  return {
    props: {
      posts: posts,
    },
  }
}
