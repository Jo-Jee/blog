import fs from 'fs'
import { sync } from 'glob'
import frontMatter from 'front-matter'
import moment from 'moment'
import { Post, FrontMatter, Tag } from '../interfaces'

export function getAllPosts(): Post[] {
  const paths = sync(`${process.cwd()}/posts/**/*.md`).reverse()

  const posts = paths.map<Post>((path) => {
    const md = fs.readFileSync(path, { encoding: 'utf-8' })
    const { attributes, body } = frontMatter<FrontMatter>(md)

    const post: Post = {
      attributes: {
        ...attributes,
        date: moment(attributes.date).format('yyy-MM-DD'),
      },
      body: body,
    }

    return post
  })

  return posts
}
