import { useState } from 'react'
import { Header, Crown, Cols, Item, Footer } from '@/components'
import Sort from '@/components/Sort'
import Image from 'next/image'
import { usePostsQuery } from '@/graphql'
import { EyeClose, EyeOpen } from '@/components/Icons'

export default () => {
  const [state, setState] = useState(false)
  const [sort, setSort] = useState('date')
  const [show, isShow] = useState(true)

  const [{ data }] = usePostsQuery()
  const posts = data?.posts

  return (
    <main className="flex min-h-screen flex-col w-full gap-8 items-center">
      <Header home={false} create={true} />

      <Crown />

      <Cols setState={setState} />
      <div className="flex items-center justify-center gap-2">
        <hr className="border border-white max-w-md min-w-[2rem]" />
        <p
          className="text-gray-200 hover:text-gray-400"
          onClick={() => isShow(!show)}
        >
          {show ? EyeOpen : EyeClose}
        </p>
        <hr className="border border-white max-w-md min-w-[2rem]" />
      </div>
      <Sort setState={setSort} />

      <Item state={state} sort={sort} show={show} />
      <Footer />
    </main>
  )
}
