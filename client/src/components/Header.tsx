import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUserQuery } from '@/graphql'

interface Props {
  h: boolean
  c: boolean
}

export default ({ h, c }: Props) => {
  const [{ data, fetching }] = useUserQuery()
  const user = data?.user

  if (fetching) return <div>Loading...</div>
  else if (!user)
    return (
      <Link href="/login" className="animate-pulse">
        Login
      </Link>
    )

  return (
    <div className="z-50 lg:max-w-5xl md:min-w-[500px] min-w-full text-sm bg-[#121516] rounded-xl">
      <div className="flex justify-between items-center gap-8 backdrop-blur-2xl static rounded-xl shadow-xl p-4 shadow-black">
        {h ? (
          <Link href="/">
            <p className="hover:text-gray-400 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-home"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </p>
          </Link>
        ) : (
          <p className="text-gray-400 cursor-default">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </p>
        )}

        {c ? (
          <Link href="/create">
            <p className="text-green-400 hover:text-green-600 animate-pulse cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-plus-square"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </p>
          </Link>
        ) : (
          <p className="text-green-600 cursor-default">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-plus-square"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </p>
        )}

        <Link href={`/u/${user.nameid}`}>
          <Image
            src={user.photoid as string}
            className="rounded-full"
            alt="photo-id"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  )
}
