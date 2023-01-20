import Link from 'next/link'

export default function Menu() {
  return (
    <header className="border-b dark:border-stone-500 w-full">
      <nav className="flex justify-between p-5 max-w-4xl m-auto">
        <Link href="/">
          <a className="font-bold text-2xl dark:text-white">JoJee</a>
        </Link>
        <div className="flex justify-between">
          <Link href="/about">
            <a className="dark:text-white">About</a>
          </Link>
        </div>
      </nav>
    </header>
  )
}
