import React from 'react'
import { Dialog } from '@mui/material'
import Image from 'next/image'
import { PostIdProps } from '@/consts'

interface ModalProps {
  open: boolean
  onClose: (id: PostIdProps) => void
  id: PostIdProps
}

export default (props: ModalProps) => {
  const { onClose, open, id } = props

  const handleClose = () => {
    onClose(id)
  }

  return (
    <Dialog onClose={handleClose} open={open} className="font-mono">
      <div className="bg-[#121516] max-w-[600px] min-h-[650px] text-gray-400 border-2 border-gray-950 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl text-center mb-6">{id.header}</h1>
        <Image
          src={id.content}
          alt="img-content"
          width={600}
          height={375}
          className="max-h-[600px] w-[600px] rounded-md"
          priority
        />
        <h1 className="text-lg mt-6">{id.owner}</h1>
      </div>
    </Dialog>
  )
}
