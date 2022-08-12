import PostList from 'src/components/PostList'
import TagList from 'src/components/TagList'
import { Tag } from 'src/interfaces'
import { getAllTags } from 'src/utils/posts'

export default function Home({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex justify-between">
      <PostList />
      <TagList tags={tags} />
    </div>
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
