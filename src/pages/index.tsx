import axios from 'axios'
import { useEffect, useState } from 'react'
import PostList from 'src/components/PostList'
import { FrontMatter } from 'src/interfaces'

interface Response {
  frontMatters: FrontMatter[]
  total: number
}

export default function Home() {
  const [res, setRes] = useState<Response>({
    frontMatters: [],
    total: 0,
  })

  useEffect(() => {
    axios
      .get('/api/posts', {
        params: {
          page: 1,
        },
      })
      .then((res) => {
        setRes(res.data)
      })
  }, [])

  return (
    <div>
      <PostList {...res} />
    </div>
  )
}
