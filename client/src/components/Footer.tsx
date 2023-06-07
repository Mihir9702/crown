import React from 'react'
import Crown from '@/assets/crown.png'
import Image from 'next/image'
import Link from 'next/link'

export default () => {
  return (
    <footer className="rounded-lg shadow-xl w-full bg-transparent shadow-black max-w-screen mt-32">
      <section>
        <div className="sm:flex sm:items-center py-4 sm:justify-between">
          <p className="flex items-center mx-16 my-4 sm:my-0">
            <Image src={Crown} className="h-8 mr-3 w-8 invert" alt="logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Crown
            </span>
          </p>
          <ul className="flex flex-wrap gap-6 items-center text-sm font-medium text-gray-500 mx-16">
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/legal" className="hover:text-gray-400">
                Legal
              </Link>
            </li>
            <li>
              <Link href="mailto:lemonmc66@gmail.com" className="hover:text-gray-400">
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
