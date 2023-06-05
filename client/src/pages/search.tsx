import { useState } from 'react'
import { Header } from '@/components'
import { SearchForm, SearchPost, SearchUser } from '@/components/Search'

export default () => {
  const [s, is] = useState<string>('') // ?

  return (
    <main className="flex flex-col items-center gap-6 h-screen justify-between">
      <div>
        <Header home={true} create={true} search={false} />
        <SearchForm search={s} setSearch={is} />
        {s && (
          <>
            <SearchUser search={s} />
            <SearchPost search={s} />
          </>
        )}
      </div>
    </main>
  )
}
