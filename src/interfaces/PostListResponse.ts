import Post from './Post'

export default interface PostListResponse {
  content: Post[]
  totalPages: number
}
