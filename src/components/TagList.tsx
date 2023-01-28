import Link from 'next/link'
import { Tag } from 'src/interfaces'

function TagRow({ tag }: { tag: Tag }) {
  return (
    <li className="py-1">
      <Link href={`/tags/${tag.name}`}>
        <a className="group text-xs">
          <span className="rounded-l bg-slate-200 dark:bg-stone-600 dark:text-white py-1 px-2">
            {tag.name}
          </span>
          <span className="rounded-r bg-slate-100 dark:bg-stone-500 dark:text-white py-1 px-2 my-2">
            {tag.count}
          </span>
        </a>
      </Link>
    </li>
  )
}

export default function TagList({ tags }: { tags: Tag[] }) {
  return (
    <div className="mr-5 w-1/6">
      <h3 className="py-4 font-bold dark:text-white">Tags</h3>
      <ul>
        {tags.map((tag) => {
          return <TagRow tag={tag} key={tag.name} />
        })}
      </ul>
    </div>
  )
}
