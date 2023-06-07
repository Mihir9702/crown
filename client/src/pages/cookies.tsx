import { Header } from '@/components'
import Link from 'next/link'
import React from 'react'

export default () => {
  return (
    <main className="flex flex-col justify-center gap-8 items-center pb-6 mb-8">
      <Header home={true} create={true} search={true} />

      {/* Terms of Service */}
      <section className="max-w-3xl mt-7">
        This page discusses how cookies are used by this site. If you continue to use this site, you
        are consenting to our use of cookies.
        {/* what are cookies */}
        <h1 className="font-bold text-2xl text-left my-4">What are cookies?</h1>
        <div className=" flex flex-col items-center gap-4">
          <p>
            Cookies are small text files stored on your computer by your web browser at the request
            of a site you're viewing. This allows the site you're viewing to remember things about
            you, such as your preferences and history or to keep you logged in.
          </p>
          <p>
            Cookies may be stored on your computer for a short time (such as only while your browser
            is open) or for an extended period of time, even years. Cookies not set by this site
            will not be accessible to us.
          </p>
        </div>
        {/* cookie usage */}
        <h1 className="font-bold text-2xl text-left my-4">Our cookie usage</h1>
        <h2 className="mb-3">This site uses cookies for numerous things, including:</h2>
        <ul>
          <li>
            <span className="font-bold">Registration</span> and maintaining your preferences. This
            includes ensuring that you can stay logged in and keeping the site in the language or
            appearance that you requested.
          </li>
          <li>
            <span className="font-bold">Analytics.</span> This allows us to determine how people are
            using the site and improve it.
          </li>
          <li>
            <span className="font-bold">Advertising cookies</span> (possibly third-party). If this
            site displays advertising, cookies may be set by the advertisers to determine who has
            viewed an ad or similar things. These cookies may be set by third parties, in which case
            this site has no ability to read or write these cookies.
          </li>
        </ul>
        {/* standard cookies */}
        <h1 className="font-bold text-2xl text-left my-4">Standard cookies we set</h1>
        <p>
          We may set cookies to keep track of your account sign in and other site functionality and
          options.
        </p>
        {/* third party cookies */}
        <h1 className="font-bold text-2xl text-left my-4">
          Additional cookies and those set by third parties
        </h1>
        <p>
          Other cookies may be set by third party service providers which may provide information
          such as tracking anonymously which users are visiting the site, or set by content embedded
          into some pages.
        </p>
        {/* removing cookies */}
        <h1 className="font-bold text-2xl text-left my-4">Removing/disabling cookies</h1>
        <p>
          Managing your cookies and cookie preferences must be done from within your browser's
          options/preferences.
        </p>
        <h1 className="font-bold text-2xl text-left my-4">More information about cookies</h1>
        <p>
          To learn more about cookies, and find more information about blocking certain types of
          cookies, please visit the{' '}
          <Link
            href="https://ico.org.uk/for-the-public/online/cookies/"
            className="text-blue-500 hover:text-blue-700"
          >
            ICO website Cookies page.
          </Link>
        </p>
      </section>
    </main>
  )
}
