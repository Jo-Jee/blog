import Link from 'next/link'

export default function PostTags({ tags }: { tags: string[] }) {
  return (
    <div>
      {tags.map((tag) => {
        return (
          <Link href={`/tags/${tag}`} key={tag}>
            <a className="mx-1 first:ml-0">
              <span className="rounded p-1 text-xs bg-slate-200 dark:bg-stone-600 dark:text-white">
                {tag}
              </span>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
