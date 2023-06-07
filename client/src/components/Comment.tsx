import Link from 'next/link'
import React from 'react'
import { formatDisplay, formatPostTime } from '.'
import {
  useCommentsQuery,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useUserQuery,
} from '@/graphql'
import { Icons20 } from './Icons'

export default ({ sort, postid }: { sort: string; postid: number }) => {
  const [{ data: id }] = useUserQuery()
  const idx = id?.user

  const [{ data: cid }] = useCommentsQuery({ variables: { postid } })
  const uidx = cid?.comments

  const [, lc] = useLikeCommentMutation()
  const [, ulc] = useUnlikeCommentMutation()

  formatDisplay(uidx, sort)

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
                    {Icons20.RedHeart}
                  </button>
                )}
                {idx && !uid.likes?.includes(idx.userid) && (
                  <button onClick={async () => await lc({ commentid: uid.commentid })}>
                    {Icons20.Heart}
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
