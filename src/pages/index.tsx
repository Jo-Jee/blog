import axios from 'axios'
import { useEffect, useState } from 'react'
import PostList from 'src/components/PostList'
import { FrontMatter } from 'src/interfaces'

export default function Home() {
  const [frontMatters, setFrontMatters] = useState<FrontMatter[]>([])

  useEffect(() => {
    axios
      .get('/api/posts', {
        params: {
          page: 1,
        },
      })
      .then((res) => {
        setFrontMatters(res.data.posts)
      })
  }, [])

  return (
    <div>
      <PostList frontMatters={frontMatters} />
    </div>
  )
}
