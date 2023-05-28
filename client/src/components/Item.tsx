import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Modal from './Modal'
import { usePostsQuery } from '@/graphql'

interface Post {
  header: string
  content: string
  owner: string
}
interface Props {
  state: boolean
}

export default (props: Props) => {
  const filler = { header: '', content: '', owner: '' }
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

  // useEffect(() => {
  //   window.addEventListener('keydown', event => {
  //     if (event.key === 'ArrowRight' && posts) {
  //       let idx = posts.findIndex(post)
  //       isPost(posts[idx + 1])
  //     }
  //   })
  // }, [post])

  const viewStates = {
    section: 'grid gap-6 max-w-[960px]',
    card: 'bg-[#181A1B] rounded-xl px-4 py-4 shadow-lg shadow-black cursor-default hover:bg-[#121516]',
    col1: {
      section: 'grid-cols-1',
      card: 'flex flex-col min-h-[300px] md:h-[500px] max-w-[500px]',
      image: 'max-h-[400px] w-[400px]',
    },
    col4: {
      section: 'sm:grid-cols-3 md:grid-cols-4 grid-cols-1',
      card: 'h-[300px] max-w-[500px]',
      image: 'max-h-[200px] w-[250px]',
    },
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
              <div className="flex justify-center">
                <Image
                  src={post.content}
                  alt="photo-id"
                  width={600}
                  height={375}
                  content="fit"
                  className={`${
                    props.state ? viewStates.col4.image : viewStates.col1.image
                  } h-full rounded-md`}
                  priority
                />
              </div>
            </button>
          )
        })}
      <Modal open={open} onClose={handleClose} id={post!} />
    </section>
  )
}
