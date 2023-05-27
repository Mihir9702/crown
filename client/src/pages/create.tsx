import { useState } from 'react'
import { useCreatePostMutation, useUserQuery } from '@/graphql'
import { useRouter } from 'next/navigation'
import { Header } from '@/components'
import { Uploader } from 'uploader'
import { UploadDropzone } from 'react-uploader'

export default () => {
  const [{ data, fetching }] = useUserQuery()
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_UPLOAD_KEY || ''

  // Initialize once (at the start of your app).
  const uploader = Uploader({
    apiKey: PUBLIC_KEY,
  })
  const uploaderOptions = {
    multi: false,

    styles: {
      colors: {
        primary: '#EC4899',
        active: '#EC4899',
      },
    },
  }

  const [error, setError] = useState('')
  const [header, setHeader] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const [, create] = useCreatePostMutation()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!header || !content) setError('[no header or url] error')

    const response = await create({
      header,
      content,
    })

    if (response.error?.graphQLErrors[0]) {
      setError(response.error?.graphQLErrors[0].message)
    } else {
      router.push('/home')
    }
  }

  if (fetching) return <div>Loading...</div>
  else if (!data?.user) router.push('/login')

  return (
    <main className="h-screen flex flex-col font-mono my-8 items-center">
      <Header c={false} h={true} />

      <form
        onSubmit={handleSubmit}
        className="lg:w-[40%] h-fit max-w-[512px] mt-[200px] px-8 py-8 shadow-lg shadow-black rounded-lg flex flex-col gap-4 items-center"
      >
        {error && <p className="text-red-500">{error}</p>}
        <input
          name={header}
          type="text"
          placeholder="Title of your content"
          className="text-[#d6d6d6] text-md md:text-lg border-2 border-[#232b2b] bg-[#0e1111] min-w-[400px] max-w-[512px] px-28 outline-none py-2 rounded-md"
          onChange={e => setHeader(e.target.value)}
          required
        />
        <UploadDropzone
          uploader={uploader}
          options={uploaderOptions}
          onUpdate={files => files.map(x => setContent(x.fileUrl))}
          width="600px"
          height="375px"
        />
        {content && (
          <button
            type="submit"
            className="bg-[#EC4899] px-4 py-2 hover:bg-pink-500 rounded-lg shadow-md shadow-black"
          >
            Upload
          </button>
        )}
      </form>
    </main>
  )
}
