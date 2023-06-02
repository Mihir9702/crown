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
import { Heart } from './Icons'

interface Post {
  header: string
  content: string
  owner: string
}
interface Props {
  state: boolean
  sort: string
}

const filler = { header: '', content: '', owner: '' }

const viewStates = {
  section: 'grid gap-6 max-w-[960px]',
  card: 'bg-[#181A1B] rounded-xl px-4 py-4 shadow-lg shadow-black cursor-default hover:bg-[#121516]',
  col1: {
    section: 'grid-cols-1',
    card: 'flex flex-col min-h-[350px] md:h-[525px] max-w-[500px]',
    image: 'max-h-[400px] w-[400px]',
  },
  col4: {
    section: 'sm:grid-cols-3 md:grid-cols-4 grid-cols-1',
    card: 'h-[325px] max-w-[500px]',
    image: 'max-h-lg w-[250px]',
  },
}

function formatPostTime(milliseconds: number): string {
  const currentTime = new Date().getTime()
  const timeDifference = currentTime - milliseconds
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)

  if (weeks > 0) {
    return `${weeks}w`
  } else if (days > 0) {
    return `${days}d`
  } else if (hours > 0) {
    return `${hours}h`
  } else {
    return `${minutes}m`
  }
}
export default (props: Props) => {
  const [{ data }] = usePostsQuery()
  const posts = data?.posts

  const [{ data: user }] = useUserQuery()
  const id = user?.user!

  const [open, isOpen] = useState(false)
  const [post, isPost] = useState<Post>(filler)

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

  if (props.sort === 'date') {
    posts?.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
  } else if (props.sort === 'popular') {
    posts?.sort((a, b) => Number(b.likes?.length) - Number(a.likes?.length))
  }

  return (
    <section
      className={`${viewStates.section} ${
        props.state ? viewStates.col4.section : viewStates.col1.section
      }`}
    >
      {posts &&
        posts.map(post => {
          const date = formatPostTime(Number(post.updatedAt))
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
                <div className="flex justify-between w-full">
                  <Link href={`/u/${post.owner}`}>
                    <p
                      className={`mb-2 text-sm w-max text-left opacity-50 hover:underline`}
                    >
                      {post.owner}
                    </p>
                  </Link>
                  {date.toString()}
                </div>
                <h1 className={`mb-3 text-xl text-left font-semibold`}>
                  {post.header}
                </h1>
                <div className="flex min-h-[325px] justify-center">
                  <Image
                    src={post.content}
                    alt="photo-id"
                    width={600}
                    height={325}
                    content="fit"
                    className={`${
                      props.state
                        ? viewStates.col4.image
                        : viewStates.col1.image
                    } rounded-md`}
                    priority
                  />
                </div>
              </button>
              <div className="flex w-full justify-between items-center">
                {id && post.likes?.includes(id?.userid) && (
                  <button
                    onClick={() => handleUnlike(post.postid)}
                    className="z-200 mb-4"
                  ></button>
                )}

                {id && !post.likes?.includes(id?.userid) && (
                  <button
                    onClick={() => handleLike(post.postid)}
                    className="z-200 py-2"
                  >
                    {Heart}
                  </button>
                )}

                <p className="">
                  {post.likes && post.likes?.length > 1
                    ? `${post.likes?.length} likes`
                    : post.likes?.length === 1
                    ? '1 like'
                    : '0 likes'}
                </p>
              </div>
            </section>
          )
        })}
      <Modal open={open} onClose={handleClose} id={post!} />
    </section>
  )
}
