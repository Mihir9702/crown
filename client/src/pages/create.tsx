import { useState } from 'react'
import { useCreatePostMutation, useUserQuery } from '@/graphql'
import { useRouter } from 'next/navigation'
import { Header, Button, responseHandler } from '@/components'
import { UploadDropzone } from 'react-uploader'
import { uploader, uploaderOptions } from './_app'

export default () => {
  const [error, setError] = useState<string | undefined>('')
  const [header, setHeader] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const [{ data, fetching }] = useUserQuery()
  const idx = data?.user
  const [, create] = useCreatePostMutation()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await create({
      params: {
        header,
        content,
      },
    })

    responseHandler(response, setError, router)
  }
  if (fetching) return <></>
  if (!idx) {
    router.push('/')
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
          maxLength={35}
          placeholder="Title of your content"
          className="text-gray-200 text-md md:text-lg border-2 border-[#232b2b] bg-[#0e1111] md:w-[93.333%] px-4 outline-none py-2 rounded-md"
          onChange={e => setHeader(e.target.value)}
          required
        />
        <UploadDropzone
          uploader={uploader}
          options={uploaderOptions}
          onUpdate={files => files.map(x => setContent(x.fileUrl))}
          // width="600px" height="375px"
        />
        {content && <Button type="submit">Upload</Button>}
      </form>
    </main>
  )
}
