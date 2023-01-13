export interface FrontMatter {
  title: string
  summary: string
  topic: string
  id: string
  tags: string[]
  date: string
  published: boolean
}

export interface Post {
  frontMatter: FrontMatter
  body: string
}

export interface Tag {
  id: number
  name: string
  count: number
}
