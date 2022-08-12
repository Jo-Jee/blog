import Link from 'next/link'
import { FrontMatter } from 'src/interfaces'

function PostRow({ frontMatter }: { frontMatter: FrontMatter }) {
  return (
    <div>
      <Link href={`/posts/${frontMatter.topic}/${frontMatter.id}`}>
        <a>{frontMatter.title}</a>
      </Link>
      <div>{frontMatter.summary}</div>
      <div>{frontMatter.date}</div>
      {frontMatter.tags.map((tag) => {
        return (
          <Link href={`/tags/${tag}`} key={`${frontMatter.id}-${tag}`}>
            <a>{tag}</a>
          </Link>
        )
      })}
    </div>
  )
}

export default function PostList({
  frontMatters,
  total,
}: {
  frontMatters: FrontMatter[]
  total: number
}) {
  return (
    <div>
      {frontMatters.map((frontMatter) => {
        return <PostRow frontMatter={frontMatter} key={frontMatter.id} />
      })}
    </div>
  )
}
