import React from 'react'
import {
  useLikePostMutation,
  useOwnerQuery,
  useUnlikePostMutation,
  useUserQuery,
} from '@/graphql'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Plus, RedHeart } from './Icons'
import { formatPostTime } from './Item'

export default function UserData({ path }: { path: string }) {
  const [{ data: ud }] = useUserQuery()
  const [{ data }] = useOwnerQuery({ variables: { owner: path } })

  const [, like] = useLikePostMutation()
  const [, unlike] = useUnlikePostMutation()

  const posts = data && data.owner ? [...data.owner] : []
  const id = ud?.user

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

  const x = posts
    ? posts.sort((a: any, b: any) => Number(a.createdAt) - Number(b.createdAt))
    : []
  return (
    <main className="grid md:grid-cols-3 gap-6">
      {x &&
        x.map(post => {
          const date = formatPostTime(Number(post.createdAt))
          return (
            <section
              key={post.postid}
              className="flex flex-col h-[30rem] rounded-lg shadow-lg shadow-black bg-[#181a1b] hover:bg-[#121516] w-80 px-5 py-4"
            >
              <Link href={`/p/${post.postid}`} rel="noopener noreferrer">
                <h1
                  className={`mb-3 text-xl text-gray-300 text-center font-semibold`}
                >
                  {post.header}
                </h1>
                {date.toString()}
                <div className="flex justify-center mt-4">
                  <Image
                    src={post.content}
                    alt="photo"
                    width={500}
                    height={500}
                    className="max-h-[20rem] h-[20rem] rounded-lg"
                  />
                </div>
              </Link>
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
      {id && id.nameid === path && (
        <Link href="/create">
          <div className="min-w-[200px] h-[30rem] hover:border-gray-600 border-gray-400 text-green-400 hover:text-green-600  flex justify-center items-center rounded-lg px-5 py-4 border">
            <p className="animate-pulse cursor-pointer">{Plus}</p>
          </div>
        </Link>
      )}
    </main>
  )
}
