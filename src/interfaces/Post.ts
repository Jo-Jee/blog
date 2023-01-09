export default interface Post {
  id: number
  title: string
  summary: string
  topicId: number
  tags: string[]
  published: boolean
  body: string
  createdAt: string
  updatedAt: string
}
