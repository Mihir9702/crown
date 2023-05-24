import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSignupMutation } from '@/graphql'
import Link from 'next/link'

export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)

  const [, signup] = useSignupMutation()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await signup({
      username: username,
      password: password,
    })

    if (response.error?.graphQLErrors[0]) {
      setError(response.error?.graphQLErrors[0].message)
    } else {
      router.push('/home')
    }
  }
  return (
    <main className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg py-12 lg:scale-150 flex flex-col items-start text-gray-300"
      >
        <h1 className="font-bold text-2xl text-gray-200">Signup</h1>
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
        <Link href={'/login'} legacyBehavior>
          <a className="text-gray-400 hover:text-gray-500 mt-4 text-sm">
            Already have an Account?
          </a>
        </Link>
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold mt-7 w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleSubmit}
        >
          Signup
        </button>
      </form>
    </main>
  )
}
