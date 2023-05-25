import React from 'react'
import Link from 'next/link'
import { useUserQuery } from '@/graphql'

interface Props {
  h: boolean
  e: boolean
  p: boolean
  c: boolean
}

export default ({ h, e, p, c }: Props) => {
  const [{ data, fetching }] = useUserQuery()

  if (fetching) return <div>Loading...</div>
  else if (!data?.user.userid)
    return (
      <Link href="/login" className="animate-pulse">
        Login
      </Link>
    )

  return (
    <div className=" z-50 max-w-5xl items-center justify-center font-mono text-sm md:flex">
      <div className="z-100 left-0 top-0 flex w-auto justify-between gap-8 border-b border-gray-800 pb-6 pt-8 backdrop-blur-2xl static rounded-xl shadow-xl border bg-[#0e1111] p-4">
        {h ? (
          <Link href="/home">
            <p className="hover:text-gray-400 cursor-pointer">Home</p>
          </Link>
        ) : (
          <p className="text-gray-400 cursor-default">Home</p>
        )}

        {e ? (
          <Link href="/explore">
            <p className="hover:text-gray-400 cursor-pointer">Explore</p>
          </Link>
        ) : (
          <p className="text-gray-400 cursor-default">Explore</p>
        )}

        {p ? (
          <Link href={`/u/${data.user.nameid}`}>
            <p className="hover:text-gray-400 cursor-pointer">Profile</p>
          </Link>
        ) : (
          <p className="text-gray-400 cursor-default">Profile</p>
        )}

        {c ? (
          <Link href="/create">
            <p className="text-green-400 hover:text-green-600 animate-pulse cursor-pointer">
              Create
            </p>
          </Link>
        ) : (
          <p className="text-green-600 cursor-default">Create</p>
        )}
      </div>
    </div>
  )
}
