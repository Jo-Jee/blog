import Link from 'next/link'

export default function Footer() {
  return (
    <div className="border-t border-slate-200 flex flex-col space-y-2 py-5 mt-aut mt-5">
      <div className="flex space-x-1 max-w-4xl m-auto">
        <Link href="/">
          <a>github</a>
        </Link>
        <Link href="/">
          <a>mail</a>
        </Link>
      </div>
    </div>
  )
}
