import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Crown from '@/assets/crown.png'
import Header from '@/components/Header'
import { useUserQuery } from '@/graphql'

export default () => {
  const [{ data, fetching }] = useUserQuery()
  const user = data?.user
  const [saved, setSaved] = useState(false)

  if (fetching) return <div>Loading...</div>
  else if (!user) return <div>DNE</div>
  else
    return (
      <main className="flex flex-col h-screen items-center mt-8">
        <Header h={true} e={true} p={false} c={true} />
        <section className="w-full flex justify-center items-center mt-32">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 w-full" />
            <div className="flex flex-col items-center pb-10">
              <Image
                src={Crown}
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                alt="pfp"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user.username}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.likes} likes
              </span>
              <div className="flex mt-4 space-x-3 gap-2 md:mt-6">
                <button
                  onClick={() => setSaved(false)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                >
                  Your Posts
                </button>
                <button
                  onClick={() => setSaved(true)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Saved
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          {user.posts &&
            !saved &&
            user.posts.map(post => (
              <a
                href={`/p/${post.postId}`}
                className="w-full h-[720px] mt-6 rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
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
    )
}
