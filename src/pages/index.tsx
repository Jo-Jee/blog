import PostList from 'src/components/PostList'
import TagList from 'src/components/TagList'
import { Tag } from 'src/interfaces'
import api from '@utils/api'

export default function Home({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex justify-between">
      <PostList />
      <TagList tags={tags} key={''} />
    </div>
  )
}

export async function getStaticProps() {
  const res = await api.get<Tag>('/tags')

  return {
    props: {
      tags: res.data,
    },
  }
}
