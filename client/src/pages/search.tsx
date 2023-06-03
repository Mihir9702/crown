import { Header } from '@/components'
import { Search } from '@/components/Icons'
import { useSearchQuery } from '@/graphql'
import { useState } from 'react'

export default () => {
  const [search, is] = useState<string>('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const [{ data }] = useSearchQuery({ variables: { search } })
    if (!data) return 'Nothing was found...'
    // should return { users, posts }
    const id = data.search
  }

  return (
    <section className="flex flex-col items-center gap-6 h-screen">
      <Header home={false} create={false} />

      <form
        onSubmit={handleSubmit}
        className="w-full md:max-w-3xl max-w-xl my-12 rounded-md dark:shadow-lg dark:shadow-black"
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center text-gray-400 pl-3 pointer-events-none">
            {Search}
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Names, Titles..."
            onChange={x => is(x.target.value)}
            value={search}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  )
}
