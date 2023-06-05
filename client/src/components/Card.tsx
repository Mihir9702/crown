import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, RedHeart } from './Icons'
import {
  Post,
  useLikePostMutation,
  usePostQuery,
  useUnlikePostMutation,
  useUserQuery,
  useUserSearchQuery,
} from '@/graphql'
import { useRouter } from 'next/navigation'
import DefaultImg from '@/assets/id.png'
import { formatPostTime } from '.'

export default (props: Post) => {
  const [, like] = useLikePostMutation()
  const [, unlike] = useUnlikePostMutation()

  const [{ data }] = usePostQuery({ variables: { postid: props.postid } })
  const post = data?.post!

  const [{ data: usq }] = useUserSearchQuery({
    variables: { nameid: props.owner },
  })

  const iusq = usq?.userSearch

  const [{ data: uid }] = useUserQuery()
  const idx = uid?.user

  const router = useRouter()

  const date = formatPostTime(Number(props.createdAt))
  return (
    <main className="min-h-full w-auto sm:max-w-sm h-max bg-[#121512] hover:bg-[#0e1111]">
      <section className="flex flex-col items-center rounded-lg border border-gray-600  w-auto min-h-[575px] max-h-[575px] p-4 mx-3 md:mx-0 lg:mx-0">
        <header className="w-full flex justify-between items-center mb-2">
          <section className="flex justify-between w-full items-center">
            <div className="flex items-center">
              <Image
                src={iusq?.photoid || DefaultImg}
                className="rounded-full"
                alt="os-id"
                width={32}
                height={32}
                priority
              />
              <Link
                href={`/u/${props.owner}`}
                className="mx-2 font-bold text-sm text-white hover:text-gray-400"
              >
                {props.owner}
              </Link>
            </div>
            <span className="text-sm">{date}</span>
          </section>
          <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
            <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
          </span>
        </header>

        <h1 className="text-left mb-1 max-w-[400px] place-self-start">{props.header}</h1>

        <Image
          className="w-auto bg-contain h-auto p-3 min-h-[400px] max-h-[400px] rounded-xl"
          onClick={() => router.push(`/p/${props.postid}`)}
          src={props.content || ''}
          alt="p-id"
          width={400}
          content="fit"
          height={400}
          priority
        />

        <footer className="pt-3 flex flex-col gap-3 items-start place-self-start">
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
          <span className="text-sm text-gray-400 font-medium mx-1">
            {props.likes?.length || 0} likes
          </span>
        </footer>
      </section>
    </main>
  )
}
