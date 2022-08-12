export interface FrontMatter {
  title: string
  summary: string
  tags: string[]
  date: string
}

export interface Post {
  frontMatter: FrontMatter
  body: string
}

export interface Tag {
  tag: string
  count: number
}
