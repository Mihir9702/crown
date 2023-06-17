import { useState } from 'react'
import { Header } from '@/components'
import { SearchForm, SearchResults, TagList } from '@/components/Search'

export default () => {
  const [s, ss] = useState<string>('')

  // taglist on rightside (?)
  return (
    <main className="flex-center-col gap-6 h-screen justify-start">
      <Header home={true} create={true} search={false} />
      <SearchForm s={s} ss={ss} />
      <TagList s={s} ss={ss} />
      {s && <SearchResults s={s} />}
    </main>
  )
}
