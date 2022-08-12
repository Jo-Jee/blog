import { Post } from 'src/interfaces'

function PostRow({ post }: { post: Post }) {
  return (
    <div key={post.frontMatter.id}>
      <div>{post.frontMatter.title}</div>
      <div>{post.frontMatter.summary}</div>
      <div>{post.frontMatter.date}</div>
      <div>{post.frontMatter.tags}</div>
    </div>
  )
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post) => {
        return <PostRow post={post} />
      })}
    </div>
  )
}
