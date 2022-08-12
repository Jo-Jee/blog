import Link from 'next/link'

export default function Footer() {
  return (
    <div className="border-t border-slate-200 flex flex-col space-y-2 py-5 my-5 mt-auto">
      <div className="flex space-x-1">
        <Link href="/">
          <a>logo</a>
        </Link>
        <Link href="/">
          <a>github</a>
        </Link>
        <Link href="/">
          <a>mail</a>
        </Link>
      </div>
      <p>cozy quokka • © 2022 • https://cozyquokka.kr</p>
    </div>
  )
}
