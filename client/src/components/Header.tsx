import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUserQuery } from '@/graphql'
import { Door, Home, Plus, Search } from '@/components/Icons'
import { tooltip } from '@/utils/Tooltip'

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
    <Link href={`/u/${user.nameid}`}>
      <Image
        src={user.photoid as string}
        className="rounded-full hover:ring-1 hover:ring-blue-600"
        alt="user.photoid"
        width={24}
        height={24}
      />
    </Link>
  )

  const hrClass =
    'z-50 lg:max-w-5xl fixed md:static bottom-0 md:top-0 md:min-w-[500px] min-w-full text-sm bg-dark rounded-xl'
  const nvClass =
    'flex-center justify-between gap-8 z-200 w-full bg-[#040508] shadow-xl p-4 shadow-black'

  if (!user)
    return (
      <header className={hrClass}>
        <nav className={nvClass}>
          {homeLink}
          {searchLink}
          {loginLink}
        </nav>
      </header>
    )
  return (
    <header className={hrClass}>
      <nav className={nvClass}>
        {homeLink}
        {createLink}
        {searchLink}
        {userLink}
      </nav>
    </header>
  )
}

function MyLink({ active, link, item }: { active: boolean; link: string; item: JSX.Element }) {
  const Green = 'text-green-400 hover:text-green-600'
  const Gray = 'text-gray-400 hover:text-gray-600'
  return active ? (
    <Link
      {...tooltip(link.split('/')[1] || 'home')}
      className={link === '/create' ? Green + 'animate-pulse' : Gray}
      href={link}
    >
      {item}
    </Link>
  ) : (
    <span className={link === '/create' ? Green : Gray}>{item}</span>
  )
}
