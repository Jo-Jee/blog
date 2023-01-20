import { ReactNode } from 'react'
import Footer from './Footer'
import Menu from './Menu'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen items-stretch dark:bg-stone-800">
      <Menu />
      <div className="container flex flex-col mx-auto px-5 max-w-4xl grow">
        {children}
      </div>
      <Footer />
    </div>
  )
}
