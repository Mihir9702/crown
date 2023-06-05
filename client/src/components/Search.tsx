import React from 'react'
import Image from 'next/image'
import { usePostSearchQuery, useUsersQuery } from '@/graphql'
import { Search } from './Icons'
import Button from './Button'

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
      className="w-full md:max-w-3xl relative max-w-xl my-12 rounded-md shadow-lg shadow-black"
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
          className="w-screen sm:w-full p-4 pl-12 text-sm border border-gray-400 rounded-lg bg-[#1B1D1E] placeholder-gray-400 text-gray-100"
          placeholder="Search Names, Titles..."
          //  @ts-ignore
          onChange={x => props.setSearch(x.target.value)}
          name={props.search}
          value={props.search}
          required
        />
        <Button type="submit" className="absolute right-2.5 bottom-2.5">
          Search
        </Button>
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
    <main className="w-full max-w-5xl">
      <title className="text-3xl mb-8 mx-[-2rem]">Users - {match.length}</title>
      <section className="w-full grid grid-cols-3">
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
      </section>
    </main>
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
    <main className="w-full max-w-5xl">
      <h1 className="text-3xl my-8 mx-[-2rem]">Posts - {match.length}</h1>
      <title className="w-full grid grid-cols-3">
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
      </title>
    </main>
  )
}
