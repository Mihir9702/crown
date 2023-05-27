import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Modal from './Modal'
import { usePostsQuery } from '@/graphql'
import { filler, viewStates } from '@/consts'

interface Post {
  header: string
  content: string
  owner: string
}
interface Props {
  state: boolean
}

export default (props: Props) => {
  const [{ data }] = usePostsQuery()
  const posts = data?.posts

  const [open, isOpen] = useState(false)
  const [post, isPost] = useState<Post>(filler)

  const handleClick = (post: any) => {
    const { header, content, owner } = post
    isOpen(true)
    isPost({ header, content, owner })
  }

  const handleClose = () => {
    isOpen(false)
    isPost(filler)
  }

  return (
    <section
      className={`${viewStates.section} ${
        props.state ? viewStates.col4.section : viewStates.col1.section
      }`}
    >
      {posts &&
        posts.map(post => {
          return (
            <button
              key={post.postid}
              onClick={() => handleClick(post)}
              className={`${viewStates.card} ${
                props.state ? viewStates.col4.card : viewStates.col1.card
              }`}
              rel="noopener noreferrer"
            >
              <Link href={`/u/${post.owner}`}>
                <p
                  className={`mb-2 text-sm w-max text-left opacity-50 hover:underline`}
                >
                  {post.owner}
                </p>
              </Link>
              <h1 className={`mb-3 text-xl text-left font-semibold`}>
                {post.header}
              </h1>
              <div className="flex justify-center mt-4">
                <Image
                  src={post.content}
                  alt="photo-id"
                  width={600}
                  height={375}
                  className={`${
                    props.state ? viewStates.col4.image : viewStates.col1.image
                  } h-full rounded-md`}
                />
              </div>
            </button>
          )
        })}
      <Modal open={open} onClose={handleClose} id={post!} />
    </section>
  )
}
