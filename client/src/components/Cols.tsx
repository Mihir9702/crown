import { Dispatch, SetStateAction } from 'react'
import { Col, Grid } from '@/components/Icons'

interface Props {
  setState: Dispatch<SetStateAction<boolean>>
}

export default ({ setState }: Props) => {
  return (
    <div className="flex gap-2">
      <p
        className="hover:text-gray-400 p-1 rounded-lg cursor-default"
        onClick={() => setState(false)}
      >
        {Col}
      </p>

      <p
        className="hover:text-gray-400 rounded-lg cursor-default p-1"
        onClick={() => setState(true)}
      >
        {Grid}
      </p>
    </div>
  )
}
