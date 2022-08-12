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
      frontMatter: {
        ...attributes,
        date: moment(attributes.date).format('yyy-MM-DD'),
      },
      body: body,
    }

    return post
  })

  return posts
}

export function getAllTags(): Tag[] {
  const posts = getAllPosts()
  const tagCountMap = new Map<string, number>()

  posts.map((post) => {
    post.frontMatter.tags.map((tag) => {
      const tagCount = tagCountMap.get(tag)
      tagCount ? tagCountMap.set(tag, tagCount + 1) : tagCountMap.set(tag, 1)
    })
  })

  const tags: Tag[] = []
  tagCountMap.forEach((value, key) => {
    tags.push({
      tag: key,
      count: value,
    })
  })

  return tags
}
