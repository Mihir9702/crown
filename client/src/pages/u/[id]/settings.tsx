import { useUpdateUserMutation, useUserQuery } from '@/graphql'
import Image from 'next/image'
import { useState } from 'react'
import { UploadButton } from 'react-uploader'
import { useRouter } from 'next/navigation'
import Icon from '@/assets/id.png'
import { responseHandler } from '@/components'
import { uploader, uploaderOptions } from '@/pages/_app'

export default () => {
  const [{ data }] = useUserQuery()
  const id = data?.user!

  const [photo, setPhoto] = useState<string>('')
  const [nid, isNid] = useState<string>(id?.nameid)
  const [bid, isBid] = useState<string>(id?.bio || '')
  const [err, isErr] = useState<string | undefined>('')
  const [, update] = useUpdateUserMutation()
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log('uploaded img')

    const response = await update({
      params: {
        nameid: nid,
        photoid: photo,
        bio: bid,
      },
    })

    responseHandler(response, isErr, router, 'back')
  }
  return (
    <section className="w-full flex justify-center items-center my-32">
      <div className="w-full py-8 max-w-sm bg-[#121516] shadow-xl shadow-black rounded-xl">
        {err && <p className="text-red-500">{err}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-center mt-4"
        >
          <UploadButton
            uploader={uploader}
            options={uploaderOptions}
            onComplete={files => files.map(x => setPhoto(x.fileUrl))}
          >
            {({ onClick }) => (
              <button onClick={onClick} className="flex flex-col items-center">
                {photo && (
                  <h1 className="mb-4 text-green-400">
                    Photo successfully submitted!
                  </h1>
                )}

                <Image
                  src={photo || id?.photoid! || Icon}
                  alt="photo-id"
                  width={96}
                  height={96}
                  className="rounded-full"
                  priority
                />
              </button>
            )}
          </UploadButton>
          <label className="p-2 rounded-md">
            Name:
            <input
              name={nid}
              value={nid}
              placeholder={id?.nameid}
              onChange={e => isNid(e.target.value)}
              className="bg-[#121516] text-gray-100 text-md text-center focus:outline-none focus:border-none"
            />
          </label>
          <label className="flex items-start p-2 rounded-md">
            <span className="mt-2">Bio: </span>
            <textarea
              name={bid}
              value={bid}
              placeholder={id?.bio! || 'Write something here...'}
              onChange={e => isBid(e.target.value)}
              className="bg-[#121516] text-gray-100 border-none px-1 text-md md:max-h-[150px] w-full max-w-[225px] text-center focus:outline-none focus:border-none"
            />
          </label>
          <div className="flex justify-center gap-8 mt-6">
            <button
              className="text-gray-300 rounded-md bg-violet-600 hover:bg-violet-700 hover:transition-all p-2"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-gray-300 rounded-md bg-blue-600 hover:bg-blue-700 hover:transition-all p-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
