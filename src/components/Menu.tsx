import Link from 'next/link'

export default function Menu() {
  return (
    <div className="flex justify-between py-10">
      <Link href="/">
        <a>logo</a>
      </Link>
      <nav className="flex justify-around w-1/5">
        <Link href="/tags">
          <a>Tags</a>
        </Link>
      </nav>
    </div>
  )
}
