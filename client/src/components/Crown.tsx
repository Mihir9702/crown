import React from 'react'
import ICrown from '@/assets/crown.png'
import Image from 'next/image'

export default function Crown() {
  return (
    <Image
      className="relative invert w-auto h-auto"
      src={ICrown}
      alt="Crown Logo"
      width={180}
      height={37}
      priority
    />
  )
}
