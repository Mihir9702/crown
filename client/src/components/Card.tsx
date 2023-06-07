import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Message, RedHeart, Send } from './Icons'
import {
  Post,
  useCommentQuery,
  useCommentsQuery,
  useCreateCommentMutation,
  useLikePostMutation,
  usePostQuery,
  useUnlikePostMutation,
  useUserQuery,
  useUserSearchQuery,
} from '@/graphql'
import { useRouter } from 'next/navigation'
import DefaultImg from '@/assets/id.png'
import { formatPostTime } from '.'
import { useState } from 'react'

export default (props: Post) => {
  const [content, setContent] = useState('')
  const [, likePost] = useLikePostMutation()
  const [, unlikePost] = useUnlikePostMutation()
  const [, createComment] = useCreateCommentMutation()

  const [{ data: pq }] = usePostQuery({ variables: { postid: props.postid } })
  const post = pq?.post!

  const [{ data: usq }] = useUserSearchQuery({
    variables: { nameid: props.owner },
  })

  const iusq = usq?.userSearch

  const [{ data: uid }] = useUserQuery()
  const idx = uid?.user

  const [{ data: cid }] = useCommentQuery({ variables: { postid: post?.postid } })
  const uidx = cid?.comment

  const [{ data: cidx }] = useCommentsQuery({ variables: { postid: post?.postid } })
  const cuidx = cidx?.comments.length

  const router = useRouter()

  const date = formatPostTime(Number(props.createdAt))
  return (
    <main className="min-h-full w-auto sm:max-w-sm h-max bg-[#121512] hover:bg-[#0e1111]">
      <section className="flex flex-col items-center rounded-lg border border-gray-600  w-auto min-h-[575px]  p-4 mx-3 md:mx-0 lg:mx-0">
        <header className="w-full flex justify-between items-center mb-2">
          <section className="flex justify-between w-full items-center">
            <div className="flex items-center">
              <Image
                src={iusq?.photoid || DefaultImg}
                className="rounded-full cursor-pointer"
                onClick={() => router.push(`/u/${props.owner}`)}
                alt="os-id"
                width={28}
                height={28}
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
          <section className="flex items-center gap-4">
            {idx && post && post.likes?.includes(idx.userid) && (
              <button
                onClick={async () => await unlikePost({ postid: post.postid })}
                className="rounded-full z-200 flex items-center gap-1"
              >
                {RedHeart}
                <span className="text-sm text-gray-400 font-medium mx-1">
                  {(props.likes && props.likes.length) || 0}
                </span>
              </button>
            )}

            {idx && !post?.likes?.includes(idx.userid) && (
              <button
                onClick={async () => await likePost({ postid: post.postid })}
                className="rounded-full z-200 flex items-center gap-1"
              >
                {Heart}
                <span className="text-sm text-gray-400 font-medium mx-1">
                  {(props.likes && props.likes.length) || 0}
                </span>
              </button>
            )}
            {idx && post && (
              <Link href={`/p/${post?.postid}`} className="z-200 flex items-center gap-1">
                {Message}
                <span className="text-sm text-gray-400 font-medium mx-1">{cuidx || 0}</span>
              </Link>
            )}

            {post && !idx && (
              <div className="flex items-center gap-2">
                <Link href="/login" className="z-200 flex items-center gap-1">
                  {Heart}
                  <span className="text-sm text-gray-400 font-medium mx-1">
                    {(props.likes && props.likes.length) || 0}
                  </span>
                </Link>
                <Link href="/login" className="z-200 flex items-center gap-1">
                  {Message}
                  <span className="text-sm text-gray-400 font-medium mx-1">{cuidx || 0}</span>
                </Link>
              </div>
            )}
          </section>
          {uidx && (
            <p>
              <Link href={`/u/${uidx.owner}`} className="hover:text-gray-400">
                {uidx.owner}
              </Link>
              :{'  '}
              {uidx.content}
              {'  '}
              <span className="text-gray-600">{formatPostTime(Number(uidx.createdAt))}</span>
            </p>
          )}
        </footer>
        <form
          className="relative w-full mt-3"
          onSubmit={
            idx
              ? async x => {
                  x.preventDefault()
                  createComment({ params: { postid: props.postid, content } })
                  location.reload()
                }
              : () => router.push('/login')
          }
        >
          <input
            type="text"
            className="bg-transparent rounded-lg w-full my-2 focus:outline-none focus:ring-gray-300 focus:border-none"
            placeholder="Add a comment..."
            name={content}
            value={content}
            maxLength={69}
            onChange={x => setContent(x.target.value)}
          />
          <button
            type="submit"
            className={`absolute right-4 bottom-1/3 ${!content ? 'text-gray-500' : 'text-gray-50'}`}
          >
            {Send}
          </button>
        </form>
      </section>
    </main>
  )
}
