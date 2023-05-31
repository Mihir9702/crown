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
  const [nid, isNid] = useState<string>(id.nameid)
  const [bid, isBid] = useState<string>(String(id.bio))
  const [err, isErr] = useState<string>(String(id.photoid))
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

    if (response.error?.graphQLErrors[0]) {
      console.log(response.error.graphQLErrors[0].message)
      isErr(response.error.graphQLErrors[0].message)
    } else {
      return location.reload()
    }
  }
  return (
    <section className="w-full flex justify-center items-center my-16">
      <div className="w-full h-screen max-h-[600px] max-w-sm bg-[#121516] shadow-xl shadow-black rounded-xl">
        {err && <p className="text-red-500">err</p>}
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
          <label>
            Name:
            <input
              name={nid}
              value={nid}
              placeholder={id?.nameid}
              onChange={e => isNid(e.target.value)}
              className="bg-[#121516] text-gray-400 text-md text-center focus:outline-none focus:border-none"
            />
          </label>
          <label className="md:mr-[12.5em]">Bio:</label>
          <textarea
            name={bid}
            value={bid}
            placeholder={id?.bio!}
            onChange={e => isBid(e.target.value)}
            className="bg-[#121516] text-gray-400 border text-md md:max-h-[150px] md:w-full md:max-w-[225px] text-center focus:outline-none focus:border-none"
          />
          <div className="flex gap-8">
            <button
              className="border border-red-500 text-red-500 rounded-md transition-all hover:bg-red-500 hover:text-[#0e1111] p-2"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-gray-300 rounded-md transition-all bg-gray-600 hover:bg-gray-500 p-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
