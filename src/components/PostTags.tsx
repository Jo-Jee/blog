import Link from 'next/link'

export default function PostTags({ tags }: { tags: string[] }) {
  return (
    <div>
      {tags.map((tag) => {
        return (
          <Link href={`/tags/${tag}`} key={tag}>
            <a className="mx-1 first:ml-0">
              <span className="rounded p-1 text-xs dark:bg-slate-100 bg-slate-200">
                {tag}
              </span>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
