import Link from 'next/link'
import { Post } from 'src/interfaces'

function PostRow({ post }: { post: Post }) {
  return (
    <div>
      <Link href={`/posts/${post.frontMatter.topic}/${post.frontMatter.id}`}>
        <a>{post.frontMatter.title}</a>
      </Link>
      <div>{post.frontMatter.summary}</div>
      <div>{post.frontMatter.date}</div>
      {post.frontMatter.tags.map((tag) => {
        return (
          <Link href={`/tags/${tag}`} key={`${post.frontMatter.id}-${tag}`}>
            <a>{tag}</a>
          </Link>
        )
      })}
    </div>
  )
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post) => {
        return <PostRow post={post} key={post.frontMatter.id} />
      })}
    </div>
  )
}
