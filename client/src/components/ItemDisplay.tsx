import { useState, Dispatch, SetStateAction } from 'react'
import { Clock, Col, EyeClose, EyeOpen, Grid, Heart } from './Icons'
import { helpid } from './index'

type IsShow = Dispatch<SetStateAction<boolean>>
type DispatchElement = Dispatch<SetStateAction<string>>
interface ItemProps {
  show: boolean
  setSort: DispatchElement
  isGrid: DispatchElement
  isShow: IsShow
}

const icon = 'hover:text-gray-400 p-1 rounded-lg cursor-default'

export function GridDisplay({ isGrid }: { isGrid: DispatchElement }) {
  const [co, ico] = useState('text-gray-400')
  const [act, iact] = useState('')
  return (
    <p className="flex gap-2">
      <span
        {...helpid('1-col')}
        className={`${co} ${icon}`}
        onClick={() => {
          ico('text-gray-400')
          iact('')
          isGrid('grid-cols-1')
        }}
      >
        {Col}
      </span>

      <span
        {...helpid('4-col')}
        className={`${act} ${icon}`}
        onClick={() => {
          ico('')
          iact('text-gray-400')
          isGrid('lg:grid-cols-3')
        }}
      >
        {Grid}
      </span>
    </p>
  )
}

export function SortDisplay({ setSort }: { setSort: DispatchElement }) {
  const [co, ico] = useState('text-gray-400')
  const [act, iact] = useState('')
  return (
    <p className="flex gap-2">
      <span
        {...helpid('recently')}
        className={`${co} ${icon}`}
        onClick={() => {
          ico('text-gray-400')
          iact('')
          setSort('date')
        }}
      >
        {Clock}
      </span>

      <span
        {...helpid('popular')}
        className={`${act} ${icon}`}
        onClick={() => {
          ico('')
          iact('text-gray-400')
          setSort('popular')
        }}
      >
        {Heart}
      </span>
    </p>
  )
}

function ShowDisplay({ show, isShow }: { show: boolean; isShow: IsShow }) {
  const hrClass = 'border border-white max-w-md min-w-[2rem]'
  return (
    <div className="flex items-center justify-center gap-2">
      <hr className={hrClass} />
      <p className="text-gray-200 hover:text-gray-400" onClick={() => isShow(!show)}>
        {show ? EyeOpen : EyeClose}
      </p>
      <hr className={hrClass} />
    </div>
  )
}

export function ItemDisplay({ show, isShow, isGrid, setSort }: ItemProps) {
  const mainClass = 'flex flex-col items-center gap-1'
  return (
    <main className={mainClass}>
      <GridDisplay isGrid={isGrid} />
      <ShowDisplay show={show} isShow={isShow} />
      <SortDisplay setSort={setSort} />
    </main>
  )
}
