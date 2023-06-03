import React from 'react'
import { Header, UserCard, UserData, Footer } from '@/components'
import { usePathname } from 'next/navigation'

export default () => {
  const pathname = usePathname()
  const path = pathname?.split('/u/')[1]

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <Header home={true} create={true} search={true} />
      <UserCard path={path} />
      <UserData path={path} />
      <Footer />
    </main>
  )
}
