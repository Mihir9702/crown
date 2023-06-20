import { useState } from 'react'
import { useCreatePostMutation, useUserQuery } from '@/graphql'
import { useRouter } from 'next/navigation'
import { Header, Button } from '@/components'
import { UploadDropzone } from 'react-uploader'
import { uploader, uploaderOptions } from './_app'
import DropDown from '@/components/DropDown'
import jsont from '@/utils/tags.json'
import { responseHandler } from '@/utils/responseHandler'

// replace upcdn with sdk for scaled production

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

    const tags = localStorage
      .getItem('tags')
      ?.replace('[', '')
      .replace(']', '')
      .replace(/"/g, '')
      .split(',')

    const response = await create({
      params: { header, content, tags },
    })

    responseHandler({ response, setError, router })
  }

  if (fetching) {
    return <div>Loading...</div>
  } else if (!idx) {
    router.push('/')
  }

  return (
    <main className="h-screen flex-center-col justify-center">
      <section className="header">
        <Header home={true} create={false} search={true} />
      </section>

      <form
        onSubmit={handleSubmit}
        className="py-8 px-32 shadow-lg w-full max-w-2xl shadow-black flex-center-col rounded-lg gap-4"
      >
        {error && <p className="text-red-500">{error}</p>}
        <input
          name={header}
          type="text"
          maxLength={35}
          placeholder="Title of your content"
          className="text-text text-md md:text-lg border-2 border-border bg-background md:w-[93.333%] px-4 outline-none py-2 rounded-md"
          onChange={e => setHeader(e.target.value)}
          required
        />
        <UploadDropzone
          uploader={uploader}
          options={uploaderOptions}
          onUpdate={files => files.map(x => setContent(x.fileUrl))}
          // width="600px" height="375px"
        />
        <DropDown name="Tags" items={jsont} />
        {content && (
          <Button type="submit" color="blue">
            Upload
          </Button>
        )}
      </form>
    </main>
  )
}
