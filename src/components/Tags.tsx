import Link from 'next/link'

export default function Tags({ tags }: { tags: string[] }) {
  return (
    <div>
      {tags.map((tag) => {
        return (
          <Link href={`/tags/${tag}`} key={tag}>
            <a className="mx-1 first:ml-0">
              <span className="bg-slate-200 rounded p-1 text-xs">{tag}</span>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
