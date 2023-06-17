import { Fragment } from 'react'
import Image from 'next/image'
import { usePostsQuery, useUsersQuery } from '@/graphql'
import { Search } from './Icons'
import Button from './Button'
import jsont from '@/utils/tags.json'

interface Props {
  s: string
  ss?: React.Dispatch<React.SetStateAction<string>>
}

export function SearchForm({ s, ss }: Props) {
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
          onChange={x => ss && ss(x.target.value)}
          name={s}
          value={s}
          required
        />
        <Button type="submit" className="absolute right-2.5 bottom-2.5" color="blue">
          Search
        </Button>
      </div>
    </form>
  )
}

function SearchUser({ s }: Props) {
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
    if (x.nameid.includes(s)) {
      match.push(x)
    }
  })

  return (
    <main className="w-full max-w-5xl">
      <h1 className="text-3xl mb-8 mx-[-2rem]">Users - {match.length}</h1>
      <section className="w-full grid grid-cols-3">
        {match &&
          match.map(x => (
            <div className="flex-center-col w-max hover:bg-highlight rounded-lg p-2">
              <h1>{x.nameid}</h1>
              <Image
                src={x.photoid || ''}
                alt="user.photoid"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
          ))}
      </section>
    </main>
  )
}

function SearchPost({ s }: Props) {
  const [{ data }] = usePostsQuery()
  const id = data?.posts

  const match = id?.filter(item => item.header.toLowerCase().includes(s.toLowerCase()))

  return (
    <main className="w-full max-w-5xl">
      <h1 className="text-3xl my-8 mx-[-2rem]">Posts - {match?.length}</h1>
      <section className="w-full grid grid-cols-3">
        {match &&
          match.map(x => (
            <div className="flex-center-col hover:bg-highlight rounded-lg p-2">
              <h1>{x.header}</h1>
              <Image
                src={x.content || ''}
                alt="post.content"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
          ))}
      </section>
    </main>
  )
}

export function TagList({ s, ss }: Props) {
  return (
    <div className="flex flex-wrap max-w-3xl gap-3">
      {jsont.map(t => (
        <Button color="dark" onClick={() => ss && ss(s + ' ' + t)}>
          {t}
        </Button>
      ))}
    </div>
  )
}

export function SearchTag({ s }: Props) {
  const [{ data }] = usePostsQuery()
  const posts = data?.posts
  const words = s.split(' ')

  const hot: any[] = []
  words.map(word => {
    posts?.map(post => {
      if (post.tags?.includes(word)) {
        hot.push(post)
      }
    })
  })

  return (
    <div>
      <h1>[Hot] - {hot.length}</h1>
      <section className="w-full grid grid-cols-3">
        {hot &&
          hot.map(x => (
            <div className="flex-center-col hover:bg-highlight rounded-lg p-2">
              <h1>{x.header}</h1>
              <Image
                src={x.content}
                alt="post.content"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
          ))}
      </section>
    </div>
  )
}

export const SearchResults = ({ s }: Props) => {
  return (
    <Fragment>
      <SearchTag s={s} />
      <SearchUser s={s} />
      <SearchPost s={s} />
    </Fragment>
  )
}
