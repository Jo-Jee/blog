import Link from 'next/link'
import { Tag } from 'src/interfaces'

function TagRow({ tag }: { tag: Tag }) {
  return (
    <li className="py-1">
      <Link href={`/tags/${tag.name}`}>
        <a className="group text-xs">
          <span className="rounded-l bg-slate-200 py-1 px-2">{tag.name}</span>
          <span className="rounded-r bg-slate-100 py-1 px-2 my-2">
            {tag.count}
          </span>
        </a>
      </Link>
    </li>
  )
}

export default function TagList({ tags }: { tags: Tag[] }) {
  return (
    <div className="ml-10 w-1/4">
      <h3 className="py-4 font-bold">Tags</h3>
      <ul>
        {tags.map((tag) => {
          return <TagRow tag={tag} key={tag.name} />
        })}
      </ul>
    </div>
  )
}
