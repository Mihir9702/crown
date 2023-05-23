import React from 'react'
import { useCreatePostMutation } from '@/graphql'

export default () => {
  const [params, setParams] = React.useState({
    header: '',
    content: '',
  })

  const [, cp] = useCreatePostMutation()

  return (
    <main className="w-full h-screen flex gap-4 items-center flex-col justify-center">
      <label>
        Title
        <input
          name={params.header}
          type="text"
          placeholder="Terrors inside Misfortune (Amy Fox)"
          className="text-gray-300 text-md md:text-lg bg-gray-600 outline-none p-2 rounded-md"
          onChange={e => setParams({ ...params, header: e.target.value })}
        />
      </label>
      <label>
        Content
        {/* file image upload */}
        <input />
      </label>
    </main>
  )
}
