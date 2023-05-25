import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLikePostMutation, usePostsQuery } from '@/graphql'
import Crown from '@/assets/crown.png'
import Header from '@/components/Header'

export default () => {
  const [{ data, fetching }] = usePostsQuery()

  if (fetching) return <div>Loading...</div>

  const [, like] = useLikePostMutation()

  const posts = data?.posts

  return (
    <main className="flex min-h-screen flex-col w-full items-center mt-8">
      <Header h={true} e={false} p={true} c={true} />

      <Image
        className="relative mt-16 dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src={Crown}
        alt="Crown Logo"
        width={180}
        height={37}
        priority
      />

      <section className="mt-12 text-center flex flex-col items-center min-w-[480px] sm:w-[512px] lg:w-[760px] max-w-[760px] gap-6">
        {posts &&
          posts.map(post => (
            <div
              // href={`/p/${post.postid}`}
              key={post.postid}
              className="w-full h-[720px] rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
              // target="_blank"
              rel="noopener noreferrer"
            >
              <Link href={`/u/${post.owner}`}>
                <p className="mb-2 text-sm text-left opacity-50 hover:underline">
                  {post.owner}
                </p>
              </Link>
              <Link href={`/p/${post.postid}`}>
                <p className="mb-3 text-xl text-left font-semibold hover:underline">
                  {post.header}
                </p>
              </Link>
              <div className="flex justify-center mt-4">
                <Image
                  src={post.content}
                  alt=""
                  width={600}
                  height={375}
                  className="max-h-[512px] w-[32rem] h-full rounded-md"
                />
              </div>
              <p className="text-gray-300 text-sm mt-3 ml-2 text-left">
                {post.likes} likes
              </p>
              <button
                className="text-3xl"
                onClick={async () => await like({ postid: post.postid })}
              >
                💖
              </button>
            </div>
          ))}
      </section>
    </main>
  )
}
