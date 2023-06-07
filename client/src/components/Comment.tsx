import Link from 'next/link'
import React from 'react'
import { formatPostTime } from '.'
import {
  useCommentsQuery,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useUserQuery,
} from '@/graphql'
import path from 'path'

const Heart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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
)

const RedHeart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="red"
    stroke="black"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-heart"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

export default ({ postid }: { postid: number }) => {
  const [{ data: id }] = useUserQuery()
  const idx = id?.user

  const [{ data: cid }] = useCommentsQuery({ variables: { postid } })
  const uidx = cid?.comments

  const [, lc] = useLikeCommentMutation()
  const [, ulc] = useUnlikeCommentMutation()

  return (
    <main className="bg-[#0e1111] flex justify-center w-full overflow-auto overflow-x-hidden pb-7">
      <section className="w-full max-w-3xl flex flex-col items-center rounded-lg border border-gray-600 overflow-auto overflow-x-hidden min-h-[575px] max-h-[575px] gap-3 p-4 mx-3 md:mx-0 lg:mx-0">
        {uidx &&
          uidx.map(uid => (
            <div
              key={uid.commentid}
              className="w-full flex justify-between items-center gap-3 text-sm px-1"
            >
              <div className="flex gap-4 items-center">
                {idx && uid.likes?.includes(idx.userid) && (
                  <button onClick={async () => await ulc({ commentid: uid.commentid })}>
                    {RedHeart}
                  </button>
                )}
                {idx && !uid.likes?.includes(idx.userid) && (
                  <button onClick={async () => await lc({ commentid: uid.commentid })}>
                    {Heart}
                  </button>
                )}
                <span className="text-gray-600">{(uid && uid.likes && uid.likes.length) || 0}</span>
                <Link
                  href={`/u/${uid.owner}`}
                  className="text-left min-w-[5.5rem] hover:text-gray-400"
                >
                  {uid.owner}
                </Link>
                :<p className="text-left">{uid.content}</p>
              </div>
              <span className="text-gray-600">{formatPostTime(Number(uid.createdAt))}</span>
            </div>
          ))}
      </section>
    </main>
  )
}
