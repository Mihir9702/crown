import { useUpdateUserMutation, useUserQuery } from '@/graphql'
import Image from 'next/image'
import React, { useState } from 'react'
import { UploadButton } from 'react-uploader'
import { Uploader } from 'uploader'
import { useRouter } from 'next/navigation'

export default () => {
  const [{ data }] = useUserQuery()
  const id = data?.user!

  const [photo, setPhoto] = useState<string>('')
  const [nid, isNid] = useState<string>(id?.nameid)
  const [bid, isBid] = useState<string>(id?.bio || '')
  const [err, isErr] = useState<string>('')
  const [, update] = useUpdateUserMutation()
  const router = useRouter()

  const uploader = Uploader({
    apiKey: process.env.NEXT_PUBLIC_UPLOAD_KEY || '',
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log('uploaded img')

    const response = await update({
      nameid: nid,
      photoid: photo,
      bio: bid,
    })

    if (response.error) {
      isErr(response.error.message)
    } else {
      return location.reload()
    }
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
            options={{ multi: false }}
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
                  src={photo || id?.photoid!}
                  alt="photo-id"
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              </button>
            )}
          </UploadButton>
          <label className="border p-2 border-gray-500 rounded-md">
            Name:
            <input
              name={nid}
              value={nid}
              placeholder={id?.nameid}
              onChange={e => isNid(e.target.value)}
              className="bg-[#121516] text-gray-400 text-md text-center focus:outline-none focus:border-none"
            />
          </label>
          <label className="mr-[12.5em]">Bio:</label>
          <textarea
            name={bid}
            value={bid}
            placeholder={id?.bio!}
            onChange={e => isBid(e.target.value)}
            className="bg-[#121516] text-gray-400 border border-gray-500 text-md md:max-h-[150px] w-full max-w-[225px] text-center focus:outline-none focus:border-none"
          />
        </form>

        <div className="flex justify-center gap-8 mt-6">
          <button
            className="border border-red-500 text-red-500 rounded-md transition-all hover:bg-red-500 dark:hover:text-gray-200 p-2"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-gray-300 rounded-md transition-all dark:bg-green-800 dark:hover:bg-green-900 p-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  )
}
