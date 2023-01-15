import { NextApiRequest, NextApiResponse } from 'next'
import api from '@utils/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'text/xml')

  const posts = await api.get<number[]>('/posts/ids')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${posts.data
                  .map((id) => {
                    return `
                    <url>
                        <loc>${`https://blog.jojee.co.kr/${id}`}</loc>
                    </url>
                    `
                  })
                  .join('')}
                </urlset>
                `

  res.end(xml)
}
