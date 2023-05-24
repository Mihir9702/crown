import { useState } from 'react'
import { useCreatePostMutation, useUserQuery } from '@/graphql'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { Uploader } from 'uploader'
import { UploadDropzone } from 'react-uploader'

interface UploadWidgetResult {
  /**
   * The `filePath` of `editedFile` (if it exists) else the `filePath` of `originalFile`.
   */
  filePath: string
  /**
   * The browser-loadable URL for `filePath`, using the most suitable transformation available from the file owner's Upload account, else uses `raw`.
   */
  fileUrl: string
}

export default () => {
  const [{ data, fetching }] = useUserQuery()
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_UPLOAD_KEY || ''

  // Initialize once (at the start of your app).
  const uploader = Uploader({
    apiKey: PUBLIC_KEY,
  })
  const uploaderOptions = {
    multi: false,

    // Comment out this line & use 'onUpdate' instead of
    // 'onComplete' to have the dropzone close after upload.
    // showFinishButton: true,

    styles: {
      colors: {
        primary: '#45caff',
      },
    },
  }

  const [error, setError] = useState('')
  const [header, setHeader] = useState('')
  const [content, setContent] = useState<string>('')

  const [, create] = useCreatePostMutation()
  const router = useRouter()

  const handleUpload = (files: UploadWidgetResult[]) => {}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!header || !content) console.log('[no header or url] error')

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
    <main className="w-full h-screen flex flex-col font-mono items-center">
      <Header c={false} e={true} h={true} p={true} />
      <form
        onSubmit={handleSubmit}
        className="lg:w-[40%] h-fit max-w-[512px] bg-[#0e1111] mt-[200px] px-16 pb-16 shadow-2xl shadow-black rounded-lg flex flex-col gap-4 items-center"
      >
        {error && <p className="text-blue-500">{error}</p>}
        <input
          name={header}
          type="text"
          placeholder="Title of your content"
          className="text-[#d6d6d6] text-md md:text-lg border-2 border-[#232b2b] bg-[#0e1111] min-w-[512px] outline-none py-2 rounded-md"
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
        {content && <button type="submit">Upload</button>}
        {/* <label className="min-w-[512px] min-h-[290px] flex flex-col justify-center items-center">
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
        </label> */}
      </form>
    </main>
  )
}
