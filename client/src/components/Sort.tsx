import { Dispatch, SetStateAction } from 'react'
import { Clock, Heart } from '@/components/Icons'

interface Props {
  setState: Dispatch<SetStateAction<string>>
}

export default ({ setState }: Props) => {
  return (
    <div className="flex gap-2">
      <p
        className="hover:text-gray-400 p-1 rounded-lg cursor-default"
        onClick={() => setState('popular')}
      >
        {Heart}
      </p>

      <p
        className="hover:text-gray-400 rounded-lg cursor-default p-1"
        onClick={() => setState('date')}
      >
        {Clock}
      </p>
    </div>
  )
}
