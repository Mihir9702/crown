import React from 'react'
import Link from 'next/link'
import { useUserQuery } from '@/graphql'

interface Props {
  h: boolean
  e: boolean
  p: boolean
  c: boolean
}

export default (props: Props) => {
  const [{ data, fetching }] = useUserQuery()

  if (fetching) return <div></div>
  else if (!data?.user) return <></>

  return (
    <div className="fixed z-10 max-w-5xl items-center justify-center font-mono text-sm md:flex">
      <div className="left-0 top-0 flex w-auto justify-between gap-8 border-b border-gray-800 pb-6 pt-8 backdrop-blur-2xl static rounded-xl shadow-xl border bg-[#0e1111] p-4">
        {props.h ? (
          <Link href="/home">
            <p className="hover:text-gray-400 cursor-pointer">Home</p>
          </Link>
        ) : (
          <p className="text-gray-400 cursor-default">Home</p>
        )}

        {props.e ? (
          <Link href="/explore">
            <p className="hover:text-gray-400 cursor-pointer">Explore</p>
          </Link>
        ) : (
          <p className="text-gray-400 cursor-default">Explore</p>
        )}

        {props.p ? (
          <Link href={`/u/${data.user.username}`}>
            <p className="hover:text-gray-400 cursor-pointer">Profile</p>
          </Link>
        ) : (
          <p className="text-gray-400 cursor-default">Profile</p>
        )}

        {props.c ? (
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
