import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useDeletePostMutation, usePostQuery, useUserQuery } from '@/graphql'
import { Header, responseHandler } from '@/components'
import Card from '@/components/Card'
import { ArrowLeft, Check, Cross, Trash } from '@/components/Icons'

export default () => {
  const pathname = usePathname()
  const path = pathname?.split('/p/')[1]
  const [err, isErr] = useState<string | undefined>('')
  const [certain, isCertain] = useState<boolean>(false)

  const [{ data }] = usePostQuery({ variables: { postid: Number(path) } })
  const id = data?.post!

  const [{ data: uid }] = useUserQuery()
  const idx = uid?.user

  const [, dp] = useDeletePostMutation()
  const mine = id?.owner === idx?.nameid

  const router = useRouter()

  const deletePost = async () => {
    const response = await dp({
      params: {
        nameid: idx?.nameid as string,
        postid: id.postid,
      },
    })

    responseHandler(response, isErr, router, 'back')
  }

  if (!id) return <main>Nothing was found...</main>
  return (
    <main className="flex flex-col justify-between items-center">
      <Header home={true} create={true} search={true} />
      <span
        className="absolute left-1/4 bottom-1/2 text-gray-100 hover:text-gray-400"
        onClick={() => router.back()}
      >
        {ArrowLeft}
      </span>

      {err && <p className="text-red-500">{err}</p>}
      {mine && !certain && (
        <span className="my-16 text-gray-100 hover:text-gray-400" onClick={() => isCertain(true)}>
          {Trash}
        </span>
      )}
      {mine && certain && (
        <nav className="flex gap-6">
          <span className="my-16 text-gray-100 hover:text-gray-400" onClick={() => deletePost()}>
            {Check}
          </span>
          <span className="my-16 text-gray-100 hover:text-gray-400" onClick={() => router.back()}>
            {Cross}
          </span>
        </nav>
      )}
      <Card
        nameid={id.owner}
        header={id.header}
        content={id.content}
        createdAt={id.createdAt}
        lid={id.likes?.length || 0}
        postid={id.postid}
      />
    </main>
  )
}
