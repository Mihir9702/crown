import React from 'react'
import { useUserSearchQuery, useUserQuery } from '@/graphql'
import Image from 'next/image'
import Link from 'next/link'
import { Settings } from '@/components/Icons'

export default function UserCard({ path }: { path: string }) {
  const [{ data }] = useUserSearchQuery({
    variables: { nameid: path },
  })
  const id = data?.userSearch

  const [{ data: userData }] = useUserQuery()
  const ud = userData?.user

  const mine = ud?.id === id?.id

  return (
    <section className="w-full flex justify-center items-center my-16">
      <div className="flex flex-col items-end w-full max-w-sm bg-[#121516] shadow-xl shadow-black rounded-xl">
        {mine && (
          <Link
            href={`/u/${id?.nameid}/settings`}
            className="text-gray-500 hover:text-gray-400 m-2 cursor-default"
          >
            {Settings}
          </Link>
        )}
        <div className="flex flex-col items-center pb-10 place-self-center">
          <Image
            src={id?.photoid!}
            className="mb-3 rounded-full shadow-lg"
            alt="photo-id"
            width={96}
            height={96}
          />
          <h5 className="my-2 text-xl font-medium text-gray-900 dark:text-gray-300">
            {id?.nameid}
          </h5>
        </div>
      </div>
    </section>
  )
}
