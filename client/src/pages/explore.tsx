import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePostsQuery, useUserQuery } from '@/graphql'
import Crown from '@/assets/crown.png'
import { UserContext } from '@/UserContext'

export default () => {
  const [{ data: userdata }] = useUserQuery()
  const [{ data, fetching }] = usePostsQuery()

  if (fetching) return <div>Loading...</div>

  const posts = data?.posts
  const user = userdata?.user

  return (
    <UserContext.Provider value={user}>
      <main className="flex min-h-screen flex-col w-full items-center mt-8">
        <div className="fixed z-10 max-w-5xl items-center justify-center font-mono text-sm md:flex">
          <div className="left-0 top-0 flex w-auto justify-between gap-8 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit static rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
            <Link href="/home">
              <p className="hover:text-gray-400 cursor-pointer">Home</p>
            </Link>

            <p className="text-gray-400 cursor-default">Explore</p>

            <Link href={`/user/:${user?.username}`}>
              <p className="hover:text-gray-400 cursor-pointer">Profile</p>
            </Link>
          </div>
        </div>

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
              <a
                href={`/p/${post.postId}`}
                className="w-full h-[720px] rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link href={`/u/${post.owner}`}>
                  <p className={`mb-2 text-sm text-left opacity-50`}>
                    {post.owner}
                  </p>
                </Link>
                <h2 className={`mb-3 text-xl text-left font-semibold`}>
                  {post.header}
                </h2>
                <div className="flex justify-center mt-4">
                  <Image
                    src={post.content}
                    alt=""
                    className="max-h-[512px] w-[32rem] h-full rounded-md"
                  />
                </div>
                <p className="text-gray-300 text-sm mt-3 ml-2 text-left">
                  {post.likes} likes
                </p>
                <button className="text-3xl">💖</button>
              </a>
            ))}
        </section>
      </main>
    </UserContext.Provider>
  )
}
