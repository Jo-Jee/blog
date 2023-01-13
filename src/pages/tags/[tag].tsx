import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import PostList from 'src/components/PostList'
import api from 'src/utils/api'
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
  return (
    <div>
      <h1 className="text-4xl font-bold mb-7"># {tag}</h1>
      <PostList tag={tag} key={tag} />
    </div>
  )
}

export async function getStaticPaths() {
  const res = await api.get<string[]>('/tags/names')

  const paths = res.data.map((tag) => {
    return {
      params: {
        tag: tag,
      },
    }
  })

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
