import React from 'react'
import Crown from '@/assets/crown.png'
import Image from 'next/image'
import Link from 'next/link'

export default () => {
  return (
    <footer className="bg-transparent rounded-lg shadow w-full mt-32">
      <div className="mx-auto max-w-xl">
        <div className="sm:flex sm:items-center py-4 sm:justify-between">
          <a href="#" className="flex items-center">
            <Image src={Crown} className="h-8 mr-3 w-8 invert" alt="logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Crown
            </span>
          </a>
          <ul className="flex flex-wrap gap-6 items-center text-sm font-medium text-gray-500">
            <li>
              <Link href="#" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Licensing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="sm:mx-auto border-gray-700" />
        <span className="block text-sm font-medium text-gray-500 text-center my-4">
          © 2023 Crown™ All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
