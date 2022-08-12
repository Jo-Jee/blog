import Link from 'next/link'
import { Tag } from 'src/interfaces'
import { getAllTags } from 'src/utils/posts'

export default function TagPage({ tags }: { tags: Tag[] }) {
  return (
    <>
      {tags.map((tag) => {
        return (
          <Link href={`/tags/${tag.name}`} key={tag.name}>
            <div>
              <span>{tag.name}</span>
              <span>{tag.count}</span>
            </div>
          </Link>
        )
      })}
    </>
  )
}

export function getStaticProps() {
  const tags = getAllTags()

  return {
    props: {
      tags: tags,
    },
  }
}
