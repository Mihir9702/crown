import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useDeletePostMutation, usePostQuery, useUserQuery } from '@/graphql'
import { Header, responseHandler, Card, Comment } from '@/components'
import { ArrowLeft, Check, Cross, Trash } from '@/components/Icons'
import { SortDisplay } from '@/components/ItemDisplay'

export default () => {
  const pathname = usePathname()
  const path = pathname?.split('/p/')[1]
  const router = useRouter()

  const [err, isErr] = useState<string | undefined>('')
  const [positive, isPositive] = useState<boolean>(false)
  const [sort, setSort] = useState<string>('date')

  const [{ data }] = usePostQuery({ variables: { postid: Number(path) } })
  const id = data?.post!

  const [{ data: uid }] = useUserQuery()
  const idx = uid?.user

  const [, dp] = useDeletePostMutation()

  const mine = id?.owner === idx?.nameid

  const uiTemplate = {
    remove: (
      <span
        className="absolute my-16 top-16 text-gray-100 hover:text-gray-400"
        onClick={() => isPositive(true)}
      >
        {Trash}
      </span>
    ),
    remove100: (
      <div className="flex gap-6">
        <span className="my-16 text-gray-100 hover:text-gray-400" onClick={() => deletePost()}>
          {Check}
        </span>
        <span className="my-16 text-gray-100 hover:text-gray-400" onClick={() => router.back()}>
          {Cross}
        </span>
      </div>
    ),
    returnKey: (
      <span
        className="lg:absolute mt-7 left-1/4 bottom-1/2 text-gray-100 hover:text-gray-400"
        onClick={() => router.back()}
      >
        {ArrowLeft}
      </span>
    ),
  }

  const deletePost = async () => {
    if (idx) {
      const response = await dp({
        params: {
          nameid: idx.nameid,
          postid: id.postid,
        },
      })

      responseHandler(response, isErr, router, 'back')
    }
  }

  if (!id) return <main>Nothing was found...</main>

  return (
    <main className="flex flex-col justify-between items-center gap-32">
      <Header home={true} create={true} search={true} />
      {uiTemplate.returnKey}
      {err && <p className="text-red-500">{err}</p>}
      {mine && !positive && uiTemplate.remove}
      {mine && positive && uiTemplate.remove100}
      <div className="flex flex-col w-full justify-center items-center pb-16 gap-32">
        <Card {...id} />
        <div className="flex flex-col gap-4">
          <SortDisplay setSort={setSort} />
          <Comment sort={sort} postid={Number(path)} />
        </div>
      </div>
    </main>
  )
}
