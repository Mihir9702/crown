import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUserQuery } from '@/graphql'
import { Door, Home, Plus, Search } from '@/components/Icons'

interface Props {
  home: boolean
  create: boolean
  search: boolean
}

export default ({ home, create, search }: Props) => {
  const [{ data }] = useUserQuery()
  const user = data?.user

  const homei = home ? (
    <Link href="/">
      <p className="hover:text-gray-400 cursor-pointer">{Home}</p>
    </Link>
  ) : (
    <p className="text-gray-400 cursor-default">{Home}</p>
  )

  const createi = create ? (
    <Link href="/create">
      <p className="text-green-400 hover:text-green-600 animate-pulse cursor-pointer">
        {Plus}
      </p>
    </Link>
  ) : (
    <p className="text-green-400 cursor-default">{Plus}</p>
  )

  const useri = user && (
    <Link href={`/u/${user?.nameid}`}>
      <Image
        src={user?.photoid as string}
        className="rounded-full"
        alt="photo-id"
        width={24}
        height={24}
      />
    </Link>
  )

  const searchi = search ? (
    <Link href="/search" className="text-gray-200 hover:text-gray-400 text-xs">
      {Search}
    </Link>
  ) : (
    <p className="text-gray-400 cursor-default">{Search}</p>
  )

  const login = (
    <Link href="/login" className="text-gray-400 text-xs">
      {Door}
    </Link>
  )

  if (!user)
    return (
      <div className="z-50 lg:max-w-5xl md:min-w-[500px] min-w-full text-sm bg-[#121516] rounded-xl">
        <div className="flex justify-between items-center gap-8 backdrop-blur-2xl static rounded-xl shadow-xl p-4 shadow-black">
          {homei}
          {searchi}
          {login}
        </div>
      </div>
    )
  return (
    <div className="z-50 lg:max-w-5xl md:min-w-[500px] min-w-full text-sm bg-[#121516] rounded-xl">
      <div className="flex justify-between items-center gap-8 backdrop-blur-2xl static rounded-xl shadow-xl p-4 shadow-black">
        {homei}
        {createi}
        {searchi}
        {useri}
      </div>
    </div>
  )
}
