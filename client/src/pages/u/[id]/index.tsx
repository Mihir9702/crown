import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header, UserCard, Card } from '@/components'
import { useUserSearchQuery } from '@/graphql'

export default () => {
  const pathname = usePathname()
  const path = pathname?.split('/u/')[1]
  const [opts, isOpts] = useState<'all' | 'likes'>('all')

  const [{ data }] = useUserSearchQuery({ variables: { nameid: path } })
  const user = data?.userSearch

  const idx = user?.posts?.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
  const uid = user?.userid
  const uidx = user?.posts?.filter(post => post.likes?.includes(Number(uid)))

  return (
    <main className="flex-center-col gap-12 min-h-screen">
      <Header home={true} create={true} search={true} />
      <UserCard path={path} isOpts={isOpts} />
      <section className="my-8 grid grid-cols-1 gap-6">
        <div className="text-center">
          {opts === 'all' ? idx?.length || 0 : uidx?.length || 0} posts
        </div>
        {idx && opts === 'all' && idx.map(p => <Card key={p.id} {...p} />)}
        {uidx && opts === 'likes' && uidx.map(p => <Card key={p.id} {...p} />)}
      </section>
    </main>
  )
}
