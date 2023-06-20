import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Message, RedHeart, Send } from './Icons'
import {
  Post,
  useCreateCommentMutation,
  useLikePostMutation,
  usePostQuery,
  useUnlikePostMutation,
  useUserQuery,
  useUserSearchQuery,
} from '@/graphql'
import { useRouter } from 'next/navigation'
import DefaultImg from '@/assets/id.png'
import { formatPostTime } from '@/utils/formatPostTime'
import { useState } from 'react'

// props vs posts ??

export default (props: Post | any) => {
  const [content, setContent] = useState('')
  const [, likePost] = useLikePostMutation()
  const [, unlikePost] = useUnlikePostMutation()
  const [, createComment] = useCreateCommentMutation()

  const [{ data: uid }] = useUserQuery()
  const idx = uid?.user

  const postid = props.postid
  const nameid = props.user?.nameid

  const [{ data: pq }] = usePostQuery({ variables: { postid } })
  const post = pq?.post

  const [{ data: usq }] = useUserSearchQuery({ variables: { nameid } })
  const iusq = usq?.userSearch

  const router = useRouter()

  const date = formatPostTime(Number(props.createdAt))
  return (
    <main className="flex justify-center min-h-full">
      <section className="min-h-full w-auto max-w-md min-w-[400px] sm:max-w-sm h-max bg-background hover:bg-highlight">
        <div className="flex-center-col rounded-lg border border-border w-auto min-h-[575px] p-4 mx-3 md:mx-0 lg:mx-0">
          <header className="w-full flex-center justify-between mb-2">
            <section className="flex-center justify-between w-full">
              <div className="flex items-center">
                <Image
                  src={iusq?.photoid || DefaultImg}
                  className="rounded-full cursor-pointer"
                  onClick={() => router.push(`/u/${post?.user.nameid}`)}
                  alt="user.photoid"
                  width={28}
                  height={28}
                  priority
                />
                <Link
                  href={`/u/${post?.user.nameid}`}
                  className="mx-2 font-bold text-sm text-text hover:text-gray-400"
                >
                  {post && post.user && post.user.nameid}
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
            className="w-auto bg-contain h-auto p-3 min-h-[500px] max-h-[500px] rounded-xl"
            onClick={() => router.push(`/p/${props.postid}`)}
            src={props.content}
            alt="post.content"
            width={500}
            content="fit"
            height={500}
            priority
          />

          <footer className="pt-3 flex flex-col gap-3 items-start place-self-start">
            <section className="flex items-center gap-4">
              {idx && post && post.likes?.includes(idx.userid) && (
                <button
                  onClick={async () => await unlikePost({ postid: post.postid })}
                  className="rounded-full z-200 flex-center gap-1"
                >
                  {RedHeart}
                  <span className="text-sm text-gray-400 font-medium mx-1">
                    {(post.likes && post.likes.length) || 0}
                  </span>
                </button>
              )}

              {idx && post && !post.likes?.includes(idx.userid) && (
                <button
                  onClick={async () => await likePost({ postid: post.postid })}
                  className="rounded-full z-200 flex-center gap-1"
                >
                  {Heart}
                  <span className="text-sm text-gray-400 font-medium mx-1">
                    {(post.likes && post.likes.length) || 0}
                  </span>
                </button>
              )}
              {idx && post && (
                <Link href={`/p/${post?.postid}`} className="z-200 flex-center gap-1">
                  {Message}
                  <span className="text-sm text-gray-400 font-medium mx-1">
                    {post.comments ? post.comments.length : 0}
                  </span>
                </Link>
              )}

              {!idx && post && (
                <div className="flex-center gap-2">
                  <Link href="/login" className="z-200 flex-center gap-1">
                    {Heart}
                    <span className="text-sm text-gray-400 font-medium mx-1">
                      {(post.likes && post.likes.length) || 0}
                    </span>
                  </Link>
                  <Link href="/login" className="z-200 flex-center gap-1">
                    {Message}
                    <span className="text-sm text-gray-400 font-medium mx-1">
                      {post.comments ? post.comments.length : 0}
                    </span>
                  </Link>
                </div>
              )}
            </section>
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
              className={`absolute right-4 bottom-1/3 ${
                !content ? 'text-gray-500' : 'text-gray-50'
              }`}
            >
              {Send}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
