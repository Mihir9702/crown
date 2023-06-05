import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header, UserCard, Card } from '@/components'
import { useOwnerQuery, usePostsQuery, useUserSearchQuery } from '@/graphql'

export default () => {
  const pathname = usePathname()
  const path = pathname?.split('/u/')[1]
  const [opts, isOpts] = useState('posts')

  const [{ data: posts }] = usePostsQuery()
  const [{ data: own }] = useOwnerQuery({ variables: { owner: path } })
  const [{ data: user }] = useUserSearchQuery({ variables: { nameid: path } })

  const idx = own?.owner.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
  const uid = user?.userSearch.userid
  const uidx = posts?.posts.filter(post => post.likes?.includes(uid as number))

  return (
    <main className="flex flex-col gap-12 items-center min-h-screen">
      <Header home={true} create={true} search={true} />
      <UserCard path={path} isOpts={isOpts} />
      <section className="my-8 grid grid-cols-1 gap-6">
        {opts === 'posts' ? idx?.length : uidx?.length} posts
        {idx && opts === 'posts' && idx.map(p => <Card key={p.id} {...p} />)}
        {uidx && opts === 'posts.liked' && uidx.map(p => <Card key={p.id} {...p} />)}
      </section>
    </main>
  )
}
