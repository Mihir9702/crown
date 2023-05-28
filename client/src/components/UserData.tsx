import { useState } from 'react'
import { useOwnerQuery } from '@/graphql'
import { PostIdProps } from '@/types'
import { Modal } from '@/components'
import Image from 'next/image'

export default function UserData({ path }: { path: string }) {
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
    <section className="grid md:grid-cols-2 gap-6">
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
