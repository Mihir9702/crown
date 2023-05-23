import { useState } from 'react'
import { useCreatePostMutation } from '@/graphql'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

export default () => {
  const [params, setParams] = useState({ header: '', content: '' })
  const [error, setError] = useState('')

  const [, cp] = useCreatePostMutation()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await cp({
      header: params.header,
      content: params.content,
    })

    if (response.error?.graphQLErrors[0]) {
      setError(response.error?.graphQLErrors[0].message)
    } else {
      router.push('/home')
    }
  }

  return (
    <main className="w-full h-screen flex flex-col font-mono items-center">
      <Header c={false} e={true} h={true} p={true} />
      <form
        onSubmit={handleSubmit}
        className="lg:w-[40%] h-fit max-w-[512px] bg-[#0e1111] mt-[200px] px-16 pb-16 shadow-2xl shadow-black rounded-lg flex flex-col gap-4 items-center"
      >
        {error && <div>{error}</div>}
        <input
          name={params.header}
          type="text"
          placeholder="Terrors inside Misfortune (Amy Fox)"
          className="text-[#d6d6d6] text-md md:text-lg border-2 border-[#232b2b] bg-[#0e1111] min-w-[512px] outline-none py-2 rounded-md"
          onChange={e => setParams({ ...params, header: e.target.value })}
          required
        />
        <label className="min-w-[512px] min-h-[290px] flex flex-col justify-center items-center">
          <h2 className="text-center text-3xl text-[#d6d6d6]">
            Drag and Drop any image here
          </h2>
          <input
            type="file"
            name={params.content}
            accept="image/png, image/jpeg, image/jpg"
            className="opacity-0"
            onChange={e => setParams({ ...params, content: e.target.value })}
            required
          />
          <p className="flex gap-3 text-lg text-gray-300">
            or
            <span className="text-pink-500 hover:text-pink-400">
              browse file
            </span>
            from device
          </p>
        </label>
        <button
          type="submit"
          className="hover:bg-[#232b2b] p-3 px-5 rounded-lg bg-gray-900 shadow-md animate-bounce"
        >
          Upload
        </button>
      </form>
    </main>
  )
}
