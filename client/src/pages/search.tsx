import {
  Footer,
  Header,
  SearchForm,
  SearchPost,
  SearchUser,
} from '@/components'
import { useState } from 'react'

export default () => {
  const [s, is] = useState<string>('')

  return (
    <main className="flex flex-col items-center gap-6 h-screen justify-between">
      <div>
        <Header home={true} create={true} search={false} />
        <SearchForm search={s} setSearch={is} />
        {s && (
          <section>
            <SearchUser search={s} />
            <SearchPost search={s} />
          </section>
        )}
      </div>
      <Footer />
    </main>
  )
}
