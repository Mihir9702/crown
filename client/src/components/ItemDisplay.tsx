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

function GridDisplay({ isGrid }: { isGrid: DispatchElement }) {
  const [co, ico] = useState('text-gray-400')
  const [act, iact] = useState('')
  return (
    <p className="flex gap-2">
      <span
        {...helpid('1-col')}
        className={`${co} hover:text-gray-400 p-1 rounded-lg cursor-default`}
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
        className={`${act} hover:text-gray-400 rounded-lg cursor-default p-1`}
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

function SortDisplay({ setSort }: { setSort: DispatchElement }) {
  const [co, ico] = useState('text-gray-400')
  const [act, iact] = useState('')
  return (
    <p className="flex gap-2">
      <span
        {...helpid('recently')}
        className={`${co} hover:text-gray-400 p-1 rounded-lg cursor-default`}
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
        className={`${act} hover:text-gray-400 p-1 rounded-lg cursor-default`}
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
  return (
    <div className="flex items-center justify-center gap-2">
      <hr className="border border-white max-w-md min-w-[2rem]" />
      <p className="text-gray-200 hover:text-gray-400" onClick={() => isShow(!show)}>
        {show ? EyeOpen : EyeClose}
      </p>
      <hr className="border border-white max-w-md min-w-[2rem]" />
    </div>
  )
}

export function ItemDisplay({ show, isShow, isGrid, setSort }: ItemProps) {
  return (
    <main className="flex flex-col items-center gap-1">
      <GridDisplay isGrid={isGrid} />
      <ShowDisplay show={show} isShow={isShow} />
      <SortDisplay setSort={setSort} />
    </main>
  )
}
