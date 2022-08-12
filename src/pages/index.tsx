import axios from 'axios'
import { useEffect, useState } from 'react'
import PostList from 'src/components/PostList'
import { FrontMatter } from 'src/interfaces'

export default function Home() {
  return (
    <div>
      <PostList />
    </div>
  )
}
