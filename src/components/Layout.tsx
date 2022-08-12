import { ReactNode } from 'react'
import Menu from './Menu'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-12 max-w-4xl">
        <Menu />
        <div>{children}</div>
      </div>
    </div>
  )
}
