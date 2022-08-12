import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Post } from '../src/interfaces'
import { getAllPosts } from '../src/utils/posts'

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.attributes.title}>
            <div>{post.attributes.title}</div>
            <div>{post.attributes.summary}</div>
            <div>{post.attributes.date}</div>
            <div>{post.attributes.tags}</div>
          </div>
        )
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = getAllPosts()

  return {
    props: {
      posts: posts,
    },
  }
}
