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

  const homeLink = <MyLink active={home} link="/" item={Home} />
  const createLink = <MyLink active={create} link="/create" item={Plus} />
  const searchLink = <MyLink active={search} link="/search" item={Search} />
  const loginLink = <MyLink active={true} link="/login" item={Door} />
  const userLink = user && (
    <Link href={`/u/${user?.nameid}`}>
      <Image
        src={user?.photoid as string}
        className="rounded-full hover:rotate-[720deg] hover:transition-all hover:duration-500 cursor-default"
        alt="photo-id"
        width={24}
        height={24}
      />
    </Link>
  )

  if (!user)
    return (
      <div className="z-50 lg:max-w-5xl md:min-w-[500px] min-w-full text-sm bg-[#121516] rounded-xl">
        <div className="flex justify-between items-center gap-8 backdrop-blur-2xl static rounded-xl shadow-xl p-4 shadow-black">
          {homeLink}
          {searchLink}
          {loginLink}
        </div>
      </div>
    )
  return (
    <div className="z-50 lg:max-w-5xl md:min-w-[500px] min-w-full text-sm bg-[#121516] rounded-xl">
      <div className="flex justify-between items-center gap-8 backdrop-blur-2xl static rounded-xl shadow-xl p-4 shadow-black">
        {homeLink}
        {createLink}
        {searchLink}
        {userLink}
      </div>
    </div>
  )
}

function MyLink({
  active,
  link,
  item,
}: {
  active: boolean
  link: string
  item: JSX.Element
}) {
  return active ? (
    <Link href={link}>
      <p
        data-te-toggle="tooltip"
        data-te-placement="bottom"
        data-te-ripple-init
        data-te-ripple-color="light"
        title={link.split('/')[1] || 'home'}
        className={`${
          link === '/create'
            ? 'text-green-400 hover:text-green-600 animate-pulse'
            : 'text-gray-400 hover:text-gray-600'
        } cursor-pointer`}
      >
        {item}
      </p>
    </Link>
  ) : (
    <p
      className={`${
        link === '/create'
          ? 'text-green-400 hover:text-green-600'
          : 'text-gray-400 hover:text-gray-600'
      } cursor-default`}
    >
      {item}
    </p>
  )
}
