import Link from 'next/link'

export default function Footer() {
  return (
    <div className="border-t border-slate-200 flex flex-col space-y-2 py-5 mt-aut mt-5">
      <div className="flex space-x-1 max-w-4xl m-auto">
        <Link href="https://github.com/cozyband">
          <a>
            <img src="/github.png"></img>
          </a>
        </Link>
        <Link href="mailto:capjjo@gmail.com">
          <a>
            <img src="/mail.png"></img>
          </a>
        </Link>
      </div>
    </div>
  )
}
