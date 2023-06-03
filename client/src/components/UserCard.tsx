import React from 'react'
import { useUserSearchQuery, useUserQuery, useLogoutMutation } from '@/graphql'
import Image from 'next/image'
import Link from 'next/link'
import { Settings } from '@/components/Icons'
import { useRouter } from 'next/router'
import Icon from '@/assets/id.png'

export default function UserCard({ path }: { path: string }) {
  const router = useRouter()
  const [, logout] = useLogoutMutation()

  const [{ data }] = useUserSearchQuery({ variables: { nameid: path } })
  const id = data?.userSearch

  const [{ data: userData }] = useUserQuery()
  const ud = userData?.user

  const mine = ud?.id === id?.id

  const handleLogout = async () => {
    const response = await logout({})

    if (response.error) {
      console.log(response.error.message)
    } else {
      location.reload()
      return router.replace('/')
    }
  }

  return (
    <section className="w-full flex justify-center items-center my-16">
      <div
        className={`flex flex-col items-end w-full max-w-sm pb-8 bg-[#121516] shadow-xl shadow-black rounded-xl ${
          !mine ? 'pt-12' : ''
        }`}
      >
        {mine && (
          <div className="flex flex-col items-center gap-2">
            <Link
              href={`/u/${id?.nameid}/settings`}
              className="text-gray-500 hover:text-gray-400 m-2 cursor-default"
            >
              {Settings}
            </Link>
            <button
              className="text-transparent bg-red-500 rounded-full p-2 cursor-default"
              onClick={() => handleLogout()}
            />
          </div>
        )}

        <div className="flex flex-col items-center place-self-center">
          <Image
            src={id?.photoid || Icon}
            className="mb-3 rounded-full shadow-lg"
            alt="photo-id"
            width={96}
            height={96}
            priority
          />
          <h5 className="my-2 text-xl font-medium text-gray-900 dark:text-gray-300">
            {id?.nameid}
          </h5>
          <p>
            <span
              className={
                id?.likes && id?.likes >= 100
                  ? 'text-green-500'
                  : 'text-yellow-400'
              }
            >
              {id?.likes}
            </span>{' '}
            pts
          </p>
          <p className="mt-4 text-center">{id?.bio}</p>
        </div>
      </div>
    </section>
  )
}
