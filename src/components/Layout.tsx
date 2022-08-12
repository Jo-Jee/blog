import { ReactNode } from 'react'
import Footer from './Footer'
import Menu from './Menu'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="container flex flex-col min-h-screen mx-auto px-12 max-w-4xl">
        <Menu />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  )
}
