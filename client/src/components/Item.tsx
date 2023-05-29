import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Modal from './Modal'
import {
  useLikePostMutation,
  usePostsQuery,
  useUnlikePostMutation,
  useUserQuery,
} from '@/graphql'

interface Post {
  header: string
  content: string
  owner: string
}
interface Props {
  state: boolean
}

const filler = { header: '', content: '', owner: '' }

const viewStates = {
  section: 'grid gap-6 max-w-[960px]',
  card: 'bg-[#181A1B] rounded-xl px-4 py-4 shadow-lg shadow-black cursor-default hover:bg-[#121516]',
  col1: {
    section: 'grid-cols-1',
    card: 'flex flex-col min-h-[300px] md:h-[525px] max-w-[500px]',
    image: 'max-h-[400px] w-[400px]',
  },
  col4: {
    section: 'sm:grid-cols-3 md:grid-cols-4 grid-cols-1',
    card: 'h-[300px] max-w-[500px]',
    image: 'max-h-[200px] w-[250px]',
  },
}

export default (props: Props) => {
  const [{ data }] = usePostsQuery()
  const posts = data?.posts

  const [{ data: user }] = useUserQuery()
  const id = user?.user!

  const [open, isOpen] = useState(false)
  const [post, isPost] = useState<Post>(filler)
  const [likes, isLike] = useState<number[]>([])

  const [, like] = useLikePostMutation()
  const [, unlike] = useUnlikePostMutation()

  const handleClick = (post: any) => {
    const { header, content, owner } = post
    isOpen(true)
    isPost({ header, content, owner })
  }

  const handleClose = () => {
    isOpen(false)
    isPost(filler)
  }

  const handleLike = async (postid: number) => {
    const response = await like({ postid })

    if (response.error?.graphQLErrors[0]) {
      console.log(response.error.graphQLErrors[0].message)
    }
  }

  const handleUnlike = async (postid: number) => {
    const response = await unlike({ postid })

    if (response.error?.graphQLErrors[0]) {
      console.log(response.error.graphQLErrors[0].message)
    }
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
            <section
              key={post.postid}
              className={`${viewStates.card} ${
                props.state ? viewStates.col4.card : viewStates.col1.card
              }`}
            >
              <button
                onClick={() => handleClick(post)}
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
                      props.state
                        ? viewStates.col4.image
                        : viewStates.col1.image
                    } h-full rounded-md`}
                    priority
                  />
                </div>
              </button>
              <div className="flex w-full justify-between">
                {id && post.likes?.includes(id?.userid) && (
                  <button
                    onClick={() => handleUnlike(post.postid)}
                    className="z-200 mb-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="red"
                      stroke="red"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-heart"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                )}

                {id && !post.likes?.includes(id?.userid) && (
                  <button
                    onClick={() => handleLike(post.postid)}
                    className="z-200 mb-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-heart"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                )}

                <p className="">{post.likes?.length} likes</p>
              </div>
            </section>
          )
        })}
      <Modal open={open} onClose={handleClose} id={post!} />
    </section>
  )
}
