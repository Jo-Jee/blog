import axios from 'axios'
import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import PostList from 'src/components/PostList'
import { FrontMatter } from 'src/interfaces'
import { getAllTags } from 'src/utils/posts'

interface Params extends ParsedUrlQuery {
  tag: string
}

interface PathResult {
  params: {
    tag: string
  }
}

export default function TagPostPage({ tag }: { tag: string }) {
  const [frontMatters, setFrontMatters] = useState<FrontMatter[]>([])

  useEffect(() => {
    axios
      .get('/api/posts', {
        params: {
          page: 1,
          tag: tag,
        },
      })
      .then((res) => {
        setFrontMatters(res.data.posts)
      })
  }, [tag])

  return (
    <div>
      <PostList frontMatters={frontMatters} />
    </div>
  )
}

export function getStaticPaths() {
  const tags = getAllTags()

  const paths = tags.reduce((result: PathResult[], tag) => {
    if (tag.name)
      result.push({
        params: {
          tag: tag.name,
        },
      })
    return result
  }, [])

  return {
    paths: paths,
    fallback: false,
  }
}

export function getStaticProps({ params }: GetStaticPropsContext) {
  const { tag } = params as Params

  if (tag)
    return {
      props: {
        tag: tag,
      },
    }
  else
    return {
      props: {
        notFound: true,
      },
    }
}
