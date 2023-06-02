import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUserQuery } from '@/graphql'
import { Door, Home, Plus } from '@/components/Icons'

interface Props {
  home: boolean
  create: boolean
}

export default ({ home, create }: Props) => {
  const [{ data }] = useUserQuery()
  const user = data?.user

  if (!user)
    return (
      <div className="z-50 lg:max-w-5xl md:min-w-[500px] min-w-full text-sm bg-[#121516] rounded-xl">
        <div className="flex justify-between items-center gap-8 backdrop-blur-2xl static rounded-xl shadow-xl p-4 shadow-black">
          {home ? (
            <Link href="/">
              <p className="hover:text-gray-400 cursor-pointer">{Home}</p>
            </Link>
          ) : (
            <p className="text-gray-400 cursor-default">{Home}</p>
          )}

          <Link href="/login" className="text-gray-400 text-xs">
            {Door}
          </Link>
        </div>
      </div>
    )
  return (
    <div className="z-50 lg:max-w-5xl md:min-w-[500px] min-w-full text-sm bg-[#121516] rounded-xl">
      <div className="flex justify-between items-center gap-8 backdrop-blur-2xl static rounded-xl shadow-xl p-4 shadow-black">
        {home ? (
          <Link href="/">
            <p className="hover:text-gray-400 cursor-pointer">{Home}</p>
          </Link>
        ) : (
          <p className="text-gray-400 cursor-default">{Home}</p>
        )}

        {create ? (
          <Link href="/create">
            <p className="text-green-400 hover:text-green-600 animate-pulse cursor-pointer">
              {Plus}
            </p>
          </Link>
        ) : (
          <p className="text-green-600 cursor-default">{Plus}</p>
        )}

        {user && (
          <Link href={`/u/${user?.nameid}`}>
            <Image
              src={user?.photoid as string}
              className="rounded-full"
              alt="photo-id"
              width={24}
              height={24}
            />
          </Link>
        )}
      </div>
    </div>
  )
}
