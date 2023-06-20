import Link from 'next/link'
import React from 'react'
import { Comment, User, useLikeCommentMutation, useUnlikeCommentMutation } from '@/graphql'
import { Icons20 } from './Icons'
import { formatPostTime } from '@/utils/formatPostTime'

interface Props {
  comment: Comment
  idx: User
}

export default ({ comment, idx }: Props) => {
  const [, lc] = useLikeCommentMutation()
  const [, ulc] = useUnlikeCommentMutation()

  if (!comment) return null

  return (
    <div className="w-full flex justify-between items-center gap-3 text-sm px-1">
      <div className="flex gap-4 items-center">
        {idx && comment.likes?.includes(idx.userid) && (
          <button onClick={async () => await ulc({ commentid: comment.commentid })}>
            {Icons20.RedHeart}
          </button>
        )}
        {idx && !comment.likes?.includes(idx.userid) && (
          <button onClick={async () => await lc({ commentid: comment.commentid })}>
            {Icons20.Heart}
          </button>
        )}
        <span className="text-gray-600">{(comment.likes && comment.likes.length) || 0}</span>
        <Link
          href={`/u/${comment.user.nameid}`}
          className="text-left min-w-[5.5rem] hover:text-gray-400"
        >
          {comment.user.nameid}
        </Link>
        :<p className="text-left">{comment.content}</p>
      </div>
      <span className="text-gray-600">{formatPostTime(Number(comment.createdAt))}</span>
    </div>
  )
}
