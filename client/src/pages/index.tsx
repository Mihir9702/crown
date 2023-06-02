import { useState } from 'react'
import { Header, Crown, Cols, Item, Footer } from '@/components'
import Sort from '@/components/Sort'

export default () => {
  const [state, setState] = useState(false)
  const [sort, setSort] = useState('date')

  return (
    <main className="flex min-h-screen flex-col w-full gap-8 items-center">
      <Header home={false} create={true} />
      <Crown />
      <Cols setState={setState} />
      <hr className="border border-white max-w-md min-w-[4rem]" />
      <Sort setState={setSort} />
      <Item state={state} sort={sort} />
      <Footer />
    </main>
  )
}
