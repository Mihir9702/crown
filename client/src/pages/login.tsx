import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginMutation, useUserQuery } from '@/graphql'
import Link from 'next/link'
import { responseHandler } from '@/components'

export default () => {
  const [{ data }] = useUserQuery()
  const router = useRouter()
  const userid = data?.user

  if (userid) {
    router.push('/')
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)

  const [, login] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await login({
      params: {
        username,
        password,
      },
    })

    responseHandler(response, setError, router)
  }

  return (
    <main className="flex justify-center items-start bg-[#0e1111] h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-[#101110] p-8 mt-8 rounded-xl shadow-lg shadow-black py-12 flex flex-col items-start text-gray-300"
      >
        <h1 className="font-bold text-2xl text-gray-200">Login</h1>
        {error && <p className="text-red-500 my-4">{error}</p>}
        <div className="flex flex-col gap-6 mt-6">
          <input
            name={username}
            type="text"
            placeholder="Username"
            className="text-gray-300 text-md md:text-lg bg-gray-600 outline-none p-2 rounded-md"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            name={password}
            type="password"
            placeholder="Password"
            className="text-gray-300 text-md md:text-lg bg-gray-600 outline-none p-2 rounded-md"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Link href={'/signup'} legacyBehavior>
          <a className="text-gray-400 hover:text-gray-500 mt-4 text-sm">Create Account</a>
        </Link>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white shadow-lg font-bold mt-4 w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </main>
  )
}
