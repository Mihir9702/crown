import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  usePostsQuery,
  useUnlikePostMutation,
  useLikePostMutation,
  useUserQuery,
} from '@/graphql'
import { Heart, RedHeart } from './Icons'
import { useRouter } from 'next/navigation'

interface Props {
  state: boolean
  sort: string
  show: boolean
}

export function formatPostTime(milliseconds: number): string {
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
  const posts = data && data.posts ? [...data.posts] : []

  const [{ data: ud }] = useUserQuery()
  const id = ud?.user

  const [, like] = useLikePostMutation()
  const [, unlike] = useUnlikePostMutation()
  const router = useRouter()

  const viewStates = {
    section: 'grid gap-6 max-w-[960px] py-1',
    card: 'bg-[#181A1B] rounded-xl px-4 shadow-lg shadow-black cursor-default hover:bg-[#121516]',
    col1: {
      section: 'grid-cols-1',
      card: `flex flex-col ${
        props.show ? 'min-h-[fit]' : 'min-h-[300px]'
      } max-w-[500px]`,
      image: 'w-80 h-80',
    },
    col4: {
      section: 'grid sm:grid-cols-2 md:grid-cols-3 gap-6 grid-cols-1',
      card: 'min-h-[150px] max-h-[500px]',
      image: 'w-80 h-80',
    },
  }

  const handleLike = async (postid: number) => {
    const response = await like({ postid })

    if (response.error) {
      console.log(response.error.message)
    }
  }

  const handleUnlike = async (postid: number) => {
    const response = await unlike({ postid })

    if (response.error) {
      console.log(response.error.message)
    }
  }

  if (props.sort === 'date' && data?.posts) {
    posts.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
  } else if (props.sort === 'popular') {
    posts.sort((a, b) => Number(b.likes?.length) - Number(a.likes?.length))
  }

  return (
    <section
      className={`${viewStates.section} ${
        props.state ? viewStates.col4.section : viewStates.col1.section
      }`}
    >
      {posts &&
        posts.map(post => {
          const date = formatPostTime(Number(post.createdAt))
          return (
            <section
              key={post.postid}
              className={`${viewStates.card} ${
                props.state ? viewStates.col4.card : viewStates.col1.card
              }`}
            >
              <button
                onClick={() => router.push(`/p/${post.postid}`)}
                rel="noopener noreferrer"
              >
                {props.show && (
                  <>
                    <div className="flex justify-between w-full pt-3">
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
                  </>
                )}
                <div className="flex min-h-[325px] justify-center">
                  <Image
                    src={post.content}
                    alt="photo-id"
                    width={500}
                    height={500}
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
              <div className="flex w-full justify-between my-[2rem] z-50 bg-transparent items-center">
                {id && post.likes?.includes(id.userid) && (
                  <button
                    onClick={() => handleUnlike(post.postid)}
                    className="z-200"
                  >
                    {RedHeart}
                  </button>
                )}

                {id && !post.likes?.includes(id.userid) && (
                  <button
                    onClick={() => handleLike(post.postid)}
                    className="z-200"
                  >
                    {Heart}
                  </button>
                )}

                <p className="text-gray-300">
                  {post.likes && post.likes.length > 1
                    ? `${post.likes.length} likes`
                    : post.likes?.length === 1
                    ? '1 like'
                    : '0 likes'}
                </p>
              </div>
            </section>
          )
        })}
    </section>
  )
}
