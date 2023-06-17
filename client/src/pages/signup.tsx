import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSignupMutation, useUserQuery } from '@/graphql'
import { ArrowRight } from '@/components/Icons'
import { Button } from '@/components'
import DefaultImg from '@/assets/id.png'
import { responseHandler } from '@/utils/responseHandler'

export default () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [nameid, setNameId] = useState<string>('')
  const [bio, setbio] = useState<string>('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [num, iNum] = useState<number>(1)

  const [{ data }] = useUserQuery()
  const idx = data?.user
  const [, signup] = useSignupMutation()
  const router = useRouter()

  if (idx) {
    router.push('/')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await signup({
      params: { username, password, nameid, bio },
    })

    responseHandler({ response, setError, router })
  }
  return (
    <main className="flex justify-center items-start h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl shadow-lg mt-8 shadow-black py-12 flex flex-col items-start text-gray-300"
      >
        <h1 className="font-bold text-2xl text-gray-200">Signup</h1>
        {error && <p className="text-red-500 my-4 text-sm">{error}</p>}
        <section className="flex flex-col gap-12 transition-all duration-1000 md:flex-row">
          <div className="flex flex-col gap-6 mt-6 p-2">
            <div className="flex gap-2">
              <input
                name={username}
                type="text"
                required={true}
                placeholder="Username"
                className="form-input"
                onChange={e => setUsername(e.target.value)}
              />
              <span className="text-red-600">*</span>
            </div>
            <div className="flex gap-2">
              <input
                name={password}
                type="password"
                required={true}
                placeholder="Password"
                className="form-input"
                onChange={e => setPassword(e.target.value)}
              />
              <span className="text-red-600">*</span>
            </div>
          </div>
          {num === 2 && (
            <div className="flex-center-col gap-6 p-2">
              <Image
                src={DefaultImg}
                alt="photo-id"
                width={96}
                height={96}
                className="rounded-full"
                priority
              />
              <input
                name={nameid}
                type="text"
                placeholder="random_name"
                className="form-input"
                onChange={e => setNameId(e.target.value)}
              />
              <textarea
                name={bio}
                placeholder="bio"
                className="form-input"
                onChange={e => setbio(e.target.value)}
              />
            </div>
          )}
        </section>
        <Link
          href="/login"
          className="text-gray-400 hover:text-gray-500 transition-all mt-4 text-sm"
        >
          Already have an Account?
        </Link>
        <div className="flex gap-4 mt-7 items-center whitespace-nowrap w-full">
          <Button type="submit" onClick={() => handleSubmit} className="w-full" color="blue">
            {num <= 1 ? 'Quick Signup' : 'Signup'}
          </Button>
          {num === 1 && <span onClick={() => iNum(num + 1)}>{ArrowRight}</span>}
        </div>
      </form>
    </main>
  )
}
