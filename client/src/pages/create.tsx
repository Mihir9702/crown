import { useState } from 'react'
import { useCreatePostMutation } from '@/graphql'
import { useRouter } from 'next/navigation'
import { Header } from '@/components'
import { Uploader } from 'uploader'
import { UploadDropzone } from 'react-uploader'

export default () => {
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

    const response = await create({ header, content })

    if (response.error) {
      setError(response.error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="absolute top-0">
        <Header home={true} create={false} search={true} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="py-8 px-32 shadow-lg w-full max-w-2xl shadow-black rounded-lg flex flex-col gap-4 items-center"
      >
        {error && <p className="text-red-500">{error}</p>}
        <input
          name={header}
          type="text"
          placeholder="Title of your content"
          className="text-[#d6d6d6] text-md md:text-lg border-2 border-[#232b2b] bg-[#0e1111] md:w-[93.333%] px-4 outline-none py-2 rounded-md"
          onChange={e => setHeader(e.target.value)}
          required
        />
        <UploadDropzone
          uploader={uploader}
          options={uploaderOptions}
          onUpdate={files => files.map(x => setContent(x.fileUrl))}
          // width="600px"
          // height="375px"
        />

        <span className="whitespace-nowrap text-yellow-400">225 x 225</span>
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
