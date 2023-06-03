import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { usePostQuery } from '@/graphql'
import { Header } from '@/components'

export default () => {
  const pathname = usePathname()
  const path = pathname?.split('/p/')[1]

  const [{ data }] = usePostQuery({ variables: { postid: Number(path) } })
  const id = data?.post

  if (!id) return <div>postid not found...</div>

  return (
    <main className="flex flex-col justify-between items-center">
      <Header home={true} create={true} search={true} />
      <div className="flex flex-col justify-center items-center gap-12 mt-20">
        <h1 className="md:text-4xl text-center text-2xl">{id.header}</h1>
        <Image
          src={id.content}
          alt="photo-id"
          width={450}
          height={450}
          priority
        />
      </div>
    </main>
  )
}
