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
          <div key={post.frontMatter.title}>
            <div>{post.frontMatter.title}</div>
            <div>{post.frontMatter.summary}</div>
            <div>{post.frontMatter.date}</div>
            <div>{post.frontMatter.tags}</div>
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
