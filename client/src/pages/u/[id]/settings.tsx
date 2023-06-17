import { useUpdatePassMutation, useUpdateUserMutation, useUserQuery } from '@/graphql'
import Image from 'next/image'
import { useState } from 'react'
import { UploadButton } from 'react-uploader'
import { useRouter } from 'next/navigation'
import Icon from '@/assets/id.png'
import { Button, Header } from '@/components'
import { uploader, uploaderOptions } from '@/pages/_app'
import { Cross } from '@/components/Icons'
import { responseHandler } from '@/utils/responseHandler'

export default () => {
  const [{ data }] = useUserQuery()
  const id = data?.user!

  const [varx, ivarx] = useState(true)
  const [photo, setPhoto] = useState<string>('')
  const [nid, isNid] = useState<string>(id?.nameid)
  const [bid, isBid] = useState<string>(id?.bio || '')
  const [err, isErr] = useState<string | undefined>('')
  const [, update] = useUpdateUserMutation()
  const [, pass] = useUpdatePassMutation()
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log('uploaded img')

    const params = { nameid: nid, photoid: photo, bio: bid }
    const response = await update({ params: { ...params } })

    responseHandler({ response, setError: isErr, router, action: 'back' })
  }

  const [currPass, iCurrPass] = useState('')
  const [newPass, iNewPass] = useState('')
  const [rePass, iRePass] = useState('')

  const formPass = async (e: any) => {
    e.preventDefault()
    console.log('updated pwd')

    if (newPass !== rePass) {
      isErr('re-re enter pwd')
      return
    }

    const response = await pass({
      params: { currPass, newPass },
    })

    responseHandler({ response, setError: isErr, router, action: 'back' })
  }

  return (
    <main className="w-screen flex flex-wrap flex-col justify-center items-center gap-[5rem]">
      <div className="flex justify-center items-center">
        <Header home={true} search={true} create={true} />
      </div>
      <section className="flex flex-col justify-around items-center w-auto py-8 px-16 bg-dark shadow-xl shadow-black rounded-xl">
        <div className="flex ml-4 my-4 items-center relative justify-center">
          <ul className="text-white flex mt-2 gap-4">
            <li
              onClick={() => ivarx(true)}
              className={`${varx ? 'text-gray-500' : 'text-gray-100'} hover:text-gray-500`}
            >
              Account
            </li>
            |
            <li
              onClick={() => ivarx(false)}
              className={`${!varx ? 'text-gray-500' : 'text-gray-100'} hover:text-gray-500`}
            >
              Security
            </li>
          </ul>
          <button
            className="absolute right-0 top-0 -mx-24 -my-6 text-gray-500 hover:text-gray-700"
            onClick={() => router.back()}
          >
            {Cross}
          </button>
        </div>
        {err && <p className="text-red-500">{err}</p>}
        {varx && (
          <form onSubmit={handleSubmit} className="flex-center-col gap-6 justify-center mt-4">
            <UploadButton
              uploader={uploader}
              options={uploaderOptions}
              onComplete={files => files.map(x => setPhoto(x.fileUrl))}
            >
              {({ onClick }) => (
                <button onClick={onClick} className="flex-center-col">
                  {photo && <h1 className="mb-4 text-green-400">Photo successfully submitted!</h1>}

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
            <label className="text-white text-lg">
              Name:
              <input
                name={nid}
                value={nid}
                placeholder={id?.nameid}
                maxLength={18}
                onChange={e => isNid(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="flex justify-start rounded-md">
              <span className="">Bio: </span>
              <textarea
                name={bid}
                value={bid}
                placeholder={id?.bio! || 'Write something here...'}
                maxLength={100}
                onChange={e => isBid(e.target.value)}
                className="form-input"
              />
            </label>
            <div className="flex justify-center gap-8 mt-6">
              <Button type="submit" color="blue">
                Save Changes
              </Button>
            </div>
          </form>
        )}
        {!varx && (
          <form onSubmit={formPass}>
            <section className="flex flex-col items-end gap-4">
              <label className="text-white text-lg">
                <h1 className="my-8 text-2xl font-bold">Change Password</h1>
                Current Password:
                <input
                  name={currPass}
                  value={currPass}
                  type="password"
                  onChange={e => iCurrPass(e.target.value)}
                  className="form-input"
                />
              </label>
              <label className="text-white text-lg">
                New Password:
                <input
                  name={newPass}
                  value={newPass}
                  type="password"
                  onChange={e => iNewPass(e.target.value)}
                  className="form-input"
                />
              </label>
              <label className="text-white text-lg">
                Re-Enter Password:
                <input
                  name={rePass}
                  value={rePass}
                  type="password"
                  onChange={e => iRePass(e.target.value)}
                  className="form-input"
                />
              </label>
              <Button type="submit" color="blue">
                Confirm
              </Button>
            </section>
          </form>
        )}
      </section>
    </main>
  )
}
