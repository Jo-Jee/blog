import type { NextApiRequest, NextApiResponse } from 'next'
import { FrontMatter } from 'src/interfaces'
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

  let posts = getAllPosts()

  if (tag)
    posts = posts.filter((post) => {
      if (post.frontMatter.tags.includes(tag)) return true
      return false
    })

  const frontMatters = posts
    .slice(page * size, size)
    .map((post) => post.frontMatter)

  res.status(200).json({
    frontMatters: frontMatters,
    total: posts.length,
  })
}
