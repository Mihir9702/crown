import { Dispatch, SetStateAction, useState } from 'react'
import { Clock, Heart } from '@/components/Icons'

interface Props {
  setState: Dispatch<SetStateAction<string>>
}

export default ({ setState }: Props) => {
  const [co, ico] = useState('text-gray-400')
  const [act, iact] = useState('')
  return (
    <div className="flex gap-2">
      <p
        className={`${co} hover:text-gray-400 p-1 rounded-lg cursor-default`}
        onClick={() => {
          ico('text-gray-400')
          iact('')
          setState('date')
        }}
      >
        {Clock}
      </p>

      <p
        className={`${act} hover:text-gray-400 p-1 rounded-lg cursor-default`}
        onClick={() => {
          ico('')
          iact('text-gray-400')
          setState('popular')
        }}
      >
        {Heart}
      </p>
    </div>
  )
}
