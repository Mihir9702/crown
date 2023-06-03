import { useState } from 'react'
import { Header, Cols, Sort, Item, Footer } from '@/components'
import { EyeClose, EyeOpen } from '@/components/Icons'
import Image from 'next/image'
import ICrown from '@/assets/crown.png'

export default () => {
  const [state, setState] = useState(false)
  const [sort, setSort] = useState('date')
  const [show, isShow] = useState(true)

  return (
    <main className="flex min-h-screen flex-col w-full gap-8 items-center">
      <Header home={false} create={true} search={true} />

      <Image
        className="relative dark:invert w-auto h-auto select-none"
        src={ICrown}
        alt="Crown Logo"
        width={180}
        height={37}
        priority
      />

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
