import Link from 'next/link'

export default function () {
  return (
    <div className="flex justify-between p-5">
      <Link href="/">
        <a>logo</a>
      </Link>
      <nav className="flex justify-around w-1/5">
        <Link href="/tags">
          <a>Tags</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </div>
  )
}
