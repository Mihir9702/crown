import React from 'react'
import Image from 'next/image'
import { usePostSearchQuery, useUsersQuery } from '@/graphql'
import { Search } from './Icons'

interface Props {
  search: string
  setSearch?: React.Dispatch<React.SetStateAction<string>>
}

export function SearchForm(props: Props) {
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
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
          className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1B1D1E] dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Names, Titles..."
          //  @ts-ignore
          onChange={x => props.setSearch(x.target.value)}
          value={props.search}
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
  )
}

export function SearchUser(props: Props) {
  const [{ data: us }] = useUsersQuery({ variables: { nameid: props.search } })
  const id = us?.users

  return (
    <section className="w-full max-w-5xl">
      <h1 className="text-3xl mb-8 mx-[-2rem]">Users - {id && id.length}</h1>
      <div className="w-full grid grid-cols-3">
        {id &&
          id.map(z => (
            <div className="flex flex-col items-center w-max hover:bg-gray-800 rounded-xl p-2 px-4">
              <h1>{z.nameid}</h1>
              <Image
                src={z.photoid || ''}
                alt="id"
                width={120}
                height={120}
                className="rounded-xl"
              />
            </div>
          ))}
      </div>
    </section>
  )
}

export function SearchPost(props: Props) {
  const [{ data: ps }] = usePostSearchQuery({
    variables: { header: props.search },
  })
  const id = ps?.postSearch

  return (
    <section className="w-full max-w-5xl">
      <h1 className="text-3xl my-8 mx-[-2rem]">Posts - {id && id.length}</h1>
      <div className="w-full grid grid-cols-3">
        {id &&
          id.map(z => (
            <div className="flex flex-col items-center hover:bg-gray-800 rounded-xl p-2 px-4">
              <h1>{z.header}</h1>
              <Image
                src={z.content || ''}
                alt="id"
                width={120}
                height={120}
                className="rounded-xl"
              />
            </div>
          ))}
      </div>
    </section>
  )
}
