import Link from 'next/link'

export default function Menu() {
  return (
    <div className="border-b w-full bg-white">
      <div className="flex justify-between p-5 max-w-4xl m-auto">
        <Link href="/">
          <a className="font-bold text-2xl">Cozyband</a>
        </Link>
        <nav className="flex justify-between">
          <Link href="/about">
            <a>About</a>
          </Link>
        </nav>
      </div>
    </div>
  )
}
