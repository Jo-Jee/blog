import { NextApiRequest, NextApiResponse } from 'next'
import PostListResponse from '@interfaces/PostListResponse'
import api from '@utils/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'text/xml')

  const posts = await api.get<PostListResponse>('/posts')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${posts.data.content
                  .map((post) => {
                    return `
                    <url>
                        <loc>${`https://blog.jojee.co.kr/${post.id}`}</loc>
                    </url>
                    `
                  })
                  .join('')}
                </urlset>
                `

  res.end(xml)
}
