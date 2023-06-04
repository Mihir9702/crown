import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, RedHeart } from './Icons'
import {
  useLikePostMutation,
  usePostQuery,
  useUnlikePostMutation,
  useUserQuery,
  useUserSearchQuery,
} from '@/graphql'
import { useRouter } from 'next/navigation'

interface Props {
  nameid: string
  header: string
  content: string
  createdAt: string
  lid: number
  postid: number
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
  const [, like] = useLikePostMutation()
  const [, unlike] = useUnlikePostMutation()

  const [{ data }] = usePostQuery({ variables: { postid: props.postid } })
  const post = data?.post!

  const [{ data: usq }] = useUserSearchQuery({
    variables: { nameid: props.nameid },
  })

  const [{ data: uid }] = useUserQuery()
  const idx = uid?.user

  const router = useRouter()

  const date = formatPostTime(Number(props.createdAt))
  return (
    <section className="min-h-full min-w-screen max-w-[500px] overflow-hidden h-max bg-[#121512] hover:bg-[#0e1111]">
      <div className="flex flex-col items-center rounded-lg overflow-hidden border border-gray-600 min-w-[400px] max-w-[400px] min-h-[575px] max-h-[575px] p-4 mx-3 md:mx-0 lg:mx-0">
        <div className="w-full flex justify-between items-center mb-2">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center">
              <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                <Image src={usq?.userSearch.photoid || ''} alt="os" width={32} height={32} />
              </div>
              <Link
                href={`/u/${props.nameid}`}
                className="mx-2 font-bold text-sm text-white hover:text-gray-400"
              >
                {props.nameid}
              </Link>
            </div>
            <span className="text-sm">{date}</span>
          </div>
          <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
            <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
          </span>
        </div>
        <h1 className="text-left mb-1 max-w-[400px] place-self-start">{props.header}</h1>
        <Image
          className="w-auto bg-cover p-3 min-h-[400px] max-h-[400px] min-w-[400px] max-w-[400px] rounded-xl"
          onClick={() => router.push(`/p/${props.postid}`)}
          src={props.content}
          alt="photoid"
          width={400}
          height={400}
        />
        <div className="pt-3 flex flex-col gap-3 items-start place-self-start">
          {idx && post && post.likes?.includes(idx.userid) && (
            <button
              onClick={async () => await unlike({ postid: post.postid })}
              className="rounded-full z-200"
            >
              {RedHeart}
            </button>
          )}
          {idx && !post?.likes?.includes(idx.userid) && (
            <button
              onClick={async () => await like({ postid: post.postid })}
              className="rounded-full z-200"
            >
              {Heart}
            </button>
          )}
          {post && !idx && (
            <Link href="/login" className="z-200">
              {Heart}
            </Link>
          )}
          <span className="text-sm text-gray-400 font-medium mx-1">{props.lid} likes</span>
        </div>
      </div>
    </section>
  )
}
