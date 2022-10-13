import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from 'src/utils/posts'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/xml')

  const posts = getAllPosts()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${posts
                  .map((post) => {
                    return `
                    <url>
                        <loc>${`https://blog.jojee.co.kr/${post.frontMatter.id}`}</loc>
                    </url>
                    `
                  })
                  .join('')}
                </urlset>
                `

  res.end(xml)
}
