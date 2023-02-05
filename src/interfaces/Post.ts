export default interface Post {
  id: number
  title: string
  summary: string
  topicId: number
  tags: string[]
  body: string
  publishedAt: string
}
