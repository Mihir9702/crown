import React from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { usePostQuery } from '@/graphql'
import { Header } from '@/components'
import { ArrowLeft } from '@/components/Icons'

export default () => {
  const pathname = usePathname()
  const path = pathname?.split('/p/')[1]

  const [{ data }] = usePostQuery({ variables: { postid: Number(path) } })
  const id = data?.post!

  const router = useRouter()

  if (!id) return <main>Nothing was found...</main>
  return (
    <main className="flex flex-col justify-between items-center">
      <Header home={true} create={true} search={true} />
      <div className="flex flex-col justify-center items-center gap-12 mt-20">
        <h1 className="md:text-4xl text-center text-2xl">{id.header}</h1>
        <Image
          src={id.content}
          alt="photo-id"
          width={400}
          height={400}
          className="w-auto h-96"
          priority
        />
        <button
          onClick={() => router.back()}
          className="dark:border dark:border-gray-100 dark:hover:border-gray-300 dark:hover:text-gray-300 dark:text-gray-100 transition-all p-2 rounded-full"
        >
          {ArrowLeft}
        </button>
      </div>
    </main>
  )
}
