import React from 'react'
import Link from 'next/link'
import Crown from '@/components/Crown'
import Skeleton from '@/components/Skeleton'
import { useUserQuery } from '@/graphql'
import { UserContext } from '../UserContext'

export default () => {
  const [{ data, fetching }] = useUserQuery()

  if (fetching) return <Skeleton />

  const user = data?.user

  return (
    <UserContext.Provider value={user}>
      <main className="flex min-h-screen flex-col w-full items-center mt-8">
        <div className="fixed z-10 max-w-5xl items-center justify-center font-mono text-sm md:flex">
          <div className="left-0 top-0 flex w-auto justify-between gap-8 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit static rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
            <p className="text-gray-400 cursor-default">Home</p>
            <Link href="/home">
              <p className="hover:text-gray-400 cursor-pointer">Home</p>
            </Link>

            <Link href="/explore">
              <p className="hover:text-gray-400 cursor-pointer">Explore</p>
            </Link>

            <p className="text-gray-400 cursor-default">Profile</p>
          </div>
        </div>

        <Crown />
        <section />
      </main>
    </UserContext.Provider>
  )
}
