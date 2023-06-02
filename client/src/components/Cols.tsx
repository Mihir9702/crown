import { Dispatch, SetStateAction, useState } from 'react'
import { Col, Grid } from '@/components/Icons'

interface Props {
  setState: Dispatch<SetStateAction<boolean>>
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
          setState(false)
        }}
      >
        {Col}
      </p>

      <p
        className={`${act} hover:text-gray-400 rounded-lg cursor-default p-1`}
        onClick={() => {
          ico('')
          iact('text-gray-400')
          setState(true)
        }}
      >
        {Grid}
      </p>
    </div>
  )
}
