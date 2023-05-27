import { useState } from 'react'
import { Header, Crown, Cols, Item } from '@/components'

export default () => {
  const [state, setState] = useState(false)

  return (
    <main className="flex min-h-screen flex-col w-full gap-8 items-center">
      <Header h={false} c={true} />
      <Crown />
      <Cols setState={setState} />
      <Item state={state} />
    </main>
  )
}
