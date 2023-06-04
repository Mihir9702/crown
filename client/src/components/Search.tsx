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
      className="w-full md:max-w-3xl max-w-xl my-12 rounded-md shadow-lg shadow-black"
    >
      <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center text-gray-400 pl-3 pointer-events-none">
          {Search}
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-12 text-sm border border-gray-400 rounded-lg  focus:ring-blue-500 focus:border-blue-500 bg-[#1B1D1E] placeholder-gray-400 text-gray-100"
          placeholder="Search Names, Titles..."
          //  @ts-ignore
          onChange={x => props.setSearch(x.target.value)}
          value={props.search}
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-blue-800  hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export function SearchUser(props: Props) {
  const [{ data }] = useUsersQuery()
  const id = data?.users

  const match: any[] = []

  if (!id)
    return (
      <section className="w-full max-w-5xl">
        <h1 className="text-3xl mb-8 mx-[-2rem]">Users - 0</h1>
      </section>
    )

  id.map(x => {
    if (x.nameid.includes(props.search)) {
      match.push(x)
    }
  })

  return (
    <section className="w-full max-w-5xl">
      <h1 className="text-3xl mb-8 mx-[-2rem]">Users - {match.length}</h1>
      <div className="w-full grid grid-cols-3">
        {match &&
          match.map(x => (
            <div className="flex flex-col items-center w-max hover:bg-gray-800 rounded-xl p-2 px-4">
              <h1>{x.nameid}</h1>
              <Image
                src={x.photoid || ''}
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
  const [{ data }] = usePostSearchQuery({ variables: { header: props.search } })
  const id = data?.postSearch

  const match: any[] = []

  if (!id)
    return (
      <section className="w-full max-w-5xl">
        <h1 className="text-3xl mb-8 mx-[-2rem]">Posts - 0</h1>
      </section>
    )

  id.map(x => {
    if (x.header.includes(props.search)) {
      match.push(x)
    }
  })

  return (
    <section className="w-full max-w-5xl">
      <h1 className="text-3xl my-8 mx-[-2rem]">Posts - {match.length}</h1>
      <div className="w-full grid grid-cols-3">
        {match &&
          match.map(x => (
            <div className="flex flex-col items-center hover:bg-gray-800 rounded-xl p-2 px-4">
              <h1>{x.header}</h1>
              <Image
                src={x.content || ''}
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
