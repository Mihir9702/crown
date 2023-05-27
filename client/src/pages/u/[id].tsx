import { useState } from 'react'
import Image from 'next/image'
import Crown from '@/assets/crown.png'
import { Header, Modal } from '@/components'
import { useOwnerQuery, useUserSearchQuery } from '@/graphql'
import { usePathname } from 'next/navigation'
import { PostIdProps } from '@/types'

function UserData({ path }: { path: string }) {
  const filler = { header: '', content: '', owner: '' }
  const [open, isOpen] = useState(false)
  const [post, isPost] = useState<PostIdProps>(filler)

  const handleClick = (post: any) => {
    isOpen(true)
    isPost({
      header: post.header,
      content: post.content,
      owner: post.owner,
    })
  }
  const handleClose = () => {
    isOpen(false)
    isPost(filler)
  }

  const [{ data: od }] = useOwnerQuery({ variables: { owner: path } })

  const me = od?.owner
  return (
    <section className="grid grid-cols-2 gap-6">
      {me &&
        me.map(post => (
          <button
            key={post.postid}
            className="w-fit min-w-[200px] bg-[#181A1B] shadow-lg hover:bg-[#121516] shadow-black h-fit min-h-[200px] rounded-lg px-5 py-4"
            onClick={() => handleClick(post)}
            rel="noopener noreferrer"
          >
            <h1
              className={`mb-3 text-xl text-gray-300 text-center font-semibold`}
            >
              {post.header}
            </h1>
            <div className="flex justify-center mt-4">
              <Image
                src={post.content}
                alt="photo"
                width={120}
                height={60}
                className="max-h-[512px] w-[250px] h-[250px] rounded-lg"
              />
            </div>
          </button>
        ))}
      <Modal open={open} onClose={handleClose} id={post} />
    </section>
  )
}

function UserCard({ path }: { path: string }) {
  const [{ data }] = useUserSearchQuery({
    variables: { nameid: path },
  })

  const id = data?.userSearch

  return (
    <section className="w-full flex justify-center items-center my-16">
      <div className="w-full max-w-sm bg-[#121516] shadow-xl shadow-black rounded-xl">
        <div className="p-4 w-full" />
        <div className="flex flex-col items-center pb-10">
          <Image
            src={id?.photoid || Crown}
            className="mb-3 rounded-full shadow-lg"
            alt="photo-id"
            width={96}
            height={96}
          />
          <h5 className="mt-2 text-xl font-medium text-gray-900 dark:text-gray-300">
            {id?.nameid}
          </h5>
        </div>
      </div>
    </section>
  )
}

export default () => {
  const pathname = usePathname()
  const path = pathname?.split('/u/')[1]

  return (
    <main className="flex flex-col h-screen items-center">
      <Header h={true} c={true} />
      <UserCard path={path} />
      <UserData path={path} />
    </main>
  )
}
