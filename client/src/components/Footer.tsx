import React from 'react'
import Crown from '@/assets/crown.png'
import Image from 'next/image'
import Link from 'next/link'

export default () => {
  const link = 'hover:text-gray-400'
  const mail = 'mailto:admin@crown.com'
  return (
    <footer className="rounded-lg shadow-xl w-full bg-transparent shadow-black max-w-screen relative bottom-0">
      <section>
        <div className="sm:flex-center py-4 sm:justify-between">
          <p className="flex-center mx-16 my-4 sm:my-0">
            <Image src={Crown} className="h-8 mr-3 w-8 invert" alt="logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Crown
            </span>
          </p>
          <ul className="flex-center flex-wrap gap-6 text-sm font-medium text-gray-500 mx-16">
            <li>
              <Link href="/about" className={link}>
                About
              </Link>
            </li>
            <li>
              <Link href="/legal" className={link}>
                Legal
              </Link>
            </li>
            <li>
              <Link href={mail} className={link}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="sm:mx-auto border-gray-700" />
        <span className="block text-sm font-medium text-gray-500 text-center my-4">
          © 2023 Crown™ All Rights Reserved.
        </span>
      </section>
    </footer>
  )
}
