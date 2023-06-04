import { useState } from 'react'
import { Header, Card, ItemDisplay } from '@/components'
import Image from 'next/image'
import ICrown from '@/assets/crown.png'
import { usePostsQuery, useUsersQuery } from '@/graphql'

// // ** delete post
// // ** tooltip
// // *** improved search
// // *** user liked posts -- [1212, 3213, 5123].map(p => <Component id={p.postid} />) -> post('postid')
// // *** authentication revamp -- signup (nameid, photoid, bio) ++ login (nameid)
// // *** image resize (settings + create) -- set image fixed w/h
// // ** spacing / colors / light -- dark mode
// ** name, icon, _document (ogt)
// ** mobile responsive (check after ogt)
// ** about page -- example post and talking about what site is (last)

export default () => {
  const [grid, isGrid] = useState<string>('grid-cols-1')
  const [sort, setSort] = useState<string>('date')
  const [show, isShow] = useState<boolean>(true)

  const [{ data: ud }] = useUsersQuery()
  const users = ud?.users

  const [{ data: pd }] = usePostsQuery()
  const posts = pd?.posts

  if (sort === 'date' && posts) {
    posts.sort((a: any, b: any) => Number(b.createdAt) - Number(a.createdAt))
  } else if (sort === 'popular' && posts) {
    posts.sort((a: any, b: any) => Number(b.likes?.length) - Number(a.likes?.length))
  }

  return (
    <main className="flex min-h-screen flex-col w-full gap-8 pb-8 items-center">
      <Header home={false} create={true} search={true} />
      <Image
        className="relative invert w-auto h-auto select-none"
        src={ICrown}
        alt="Crown Logo"
        width={180}
        height={37}
        priority
      />
      {users ? users.length : 0} users | {posts ? posts.length : 0} posts
      <ItemDisplay show={show} setSort={setSort} isGrid={isGrid} isShow={isShow} />
      <section className={`grid ${grid} items-center justify-center gap-4`}>
        {posts?.map(post => {
          return show ? (
            <Card
              key={post.postid}
              nameid={post.owner}
              header={post.header}
              content={post.content}
              createdAt={post.createdAt}
              lid={post.likes?.length || 0}
              postid={post.postid}
            />
          ) : (
            <Image src={post.content} alt="post.content" width={225} height={225} />
          )
        })}
      </section>
    </main>
  )
}
