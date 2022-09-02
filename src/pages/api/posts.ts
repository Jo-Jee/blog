import type { NextApiRequest, NextApiResponse } from 'next'
import { FrontMatter, Post } from 'src/interfaces'
import { getAllPosts } from 'src/utils/posts'

interface Res {
  frontMatters: FrontMatter[]
  total: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  const page = req.query.page ? +req.query.page.toString() - 1 : 0
  const tag = req.query.tag as string
  let size = 10

  let frontMatters: FrontMatter[] = []
  let posts = getAllPosts()

  if (tag)
    posts = posts.filter((post) => {
      if (post.frontMatter.tags.includes(tag)) return true
      return false
    })

  const total = Math.floor(posts.length / size) + 1

  if (page > -1 && page < total) {
    frontMatters = posts
      .slice(page * size, page * size + size)
      .map((post) => post.frontMatter)
  }

  res.status(200).json({
    frontMatters: frontMatters,
    total: total,
  })
}
