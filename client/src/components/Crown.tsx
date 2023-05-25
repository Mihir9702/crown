import React from 'react'
import ICrown from '@/assets/crown.png'
import Image from 'next/image'

export default function Crown() {
  return (
    <Image
      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
      src={ICrown}
      alt="Crown Logo"
      width={180}
      height={37}
      priority
    />
  )
}
