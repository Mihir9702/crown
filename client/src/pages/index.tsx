import { useEffect, useState } from 'react'
import { Header, Card, ItemDisplay, Footer, formatDisplay } from '@/components'
import Image from 'next/image'
import ICrown from '@/assets/crown.png'
import { usePostsQuery, useUsersQuery } from '@/graphql'
import { ArrowUp } from '@/components/Icons'

export default () => {
  const [gridCols, isGrid] = useState<string>('grid-cols-1')
  const [sort, setSort] = useState<string>('date')
  const [show, isShow] = useState<boolean>(true)
  const [scrollBehavior, xScrollBehavior] = useState<boolean>(false)

  const [{ data: ud }] = useUsersQuery()
  const users = ud?.users

  const [{ data: pd }] = usePostsQuery()
  const posts = pd?.posts

  formatDisplay(posts, sort)

  useEffect(() => {
    const visibile = () => (window.scrollY > 300 ? xScrollBehavior(true) : xScrollBehavior(false))
    window.addEventListener('scroll', visibile)
    return () => window.removeEventListener('scroll', visibile)
  }, [])

  return (
    <main className="flex flex-col justify-center gap-8 items-center">
      <Header home={false} create={true} search={true} />
      <Image className="invert w-64" src={ICrown} alt="Crown Logo" priority />
      {users ? users.length : 0} users | {posts ? posts.length : 0} posts
      <ItemDisplay show={show} setSort={setSort} isGrid={isGrid} isShow={isShow} />
      <section className={`grid ${gridCols} items-center w-auto justify-center gap-8 pb-4`}>
        {posts &&
          posts.map(p => {
            let img = 225
            return show ? (
              <Card key={p.postid} {...p} />
            ) : (
              <Image
                key={p.postid}
                src={p.content}
                alt="post.content"
                width={img}
                height={img}
                className="w-full h-auto"
                priority
              />
            )
          })}
      </section>
      {scrollBehavior && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed text-gray-600 hover:text-gray-700 top-4 left-2"
        >
          {ArrowUp}
        </button>
      )}
      <Footer />
    </main>
  )
}
