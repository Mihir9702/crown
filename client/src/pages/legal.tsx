import { Header } from '@/components'
import Link from 'next/link'
import React from 'react'

export default () => {
  return (
    <main className="flex flex-col justify-center gap-8 items-center pb-6 mb-8">
      <Header home={true} create={true} search={true} />

      {/* Terms of Service */}
      <section className="max-w-3xl mt-7">
        18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement
        <h1 className="font-bold text-2xl text-left my-4">Terms of Service</h1>
        <h2 className="mb-3">
          Terms of Service By accessing the Rule34 website ("Site") you accept the following Terms
          of Service. From that point onwards, Rule34 will treat your use of the Site as acceptance
          of the Terms.
        </h2>
        <div>
          The Site reserves the right to change these terms at any time:
          <ul>
            <li>-If you are a minor, then you will not use the Site.</li>
            <li>-The Site is presented to you AS IS, without any warranty, express or implied.</li>
            <li>
              -You will not hold the Site or the owner liable for damages caused by the use of the
              site.
            </li>
            <li>
              -The Site reserves the right to delete or modify your account, or any content you have
              posted to the site.
            </li>
            <li>-You will upload content that is of high quality.</li>
            <li>
              -You understand that there may be content on the Site that does not appeal to you or
              you feel is morally wrong.
            </li>
            <li>
              -You accept that the Site is not liable for any content that you may stumble upon.
            </li>
            <li>-You are using this site only for personal use.</li>
            <li>
              -You will not use any automated process to retrieve or index any portion of the site
              or site contents.
            </li>
          </ul>
        </div>
      </section>

      {/* Prohibited Content */}
      <section className="max-w-3xl mt-7">
        <h1 className="font-bold text-2xl text-left mb-4">Prohibited Content</h1>
        <h2 className="mb-3">
          In addition, you may not use the Site to upload any of the following:
        </h2>
        <ul className="flex flex-col gap-2">
          <li>
            Child pornography: Any photograph or drawing or movie that depicts children in a sexual
            manner. This includes nudity, explicit sex, implied sex, or sexually persuasive
            positions.
          </li>
          <li>
            Bestiality: Any photograph or photorealistic drawing or movie that depicts humans having
            sex (either explicit or implied) with other non-human animals. Watermarked: Any image
            where a person who is not the original copyright owner has placed a watermark on the
            image.
          </li>
          <li>
            Poorly compressed: Any image where compression artifacts are easily visible.
            Doujinshi/Manga: Do not upload these. Comic strips are fine (4koma). Light novels are
            considered doujinshi as of now.
          </li>
          <li>Grotesque: Any depiction of extreme mutilation, extreme bodily distension, feces.</li>
          <li>
            Paysites: This should be plainly obvious, but apparently it needs to be listed here.
          </li>
          <li>Real porn: We're a hentai site, AI for anime is ok but not real people.</li>
        </ul>
      </section>

      {/* Privacy Policy */}
      <section className="max-w-3xl mt-7">
        <h1 className="font-bold text-2xl text-left mb-4">Privacy Policy</h1>
        The Site is allowed to make public, including but not limited to: uploaded posts, favorited
        posts, computer generated id and any edits made to the site.
        <h2 className="font-bold text-xl text-left my-4">What information we hold about you</h2> The
        type of data that we collect and process includes: Your username. Your posts. Your
        favorites.
        <h2 className="font-bold text-xl text-left my-4">Keeping your data secure</h2>
        We are committed to ensuring that any information you provide to us is secure. In order to
        prevent unauthorized access or disclosure, we have put in place suitable measures and
        procedures to safeguard and secure the information that we collect.
      </section>

      {/* Cookies Policy */}
      <section className="max-w-3xl mt-7">
        <h1 className="font-bold text-2xl text-left mb-4">Cookies Policy</h1>
        Cookies are small text files which are set by us on your computer which allow us to provide
        certain functionality on our site, such as being able to log in, or remembering certain
        preferences. We have a detailed cookie policy and more information about the cookies that we
        set on{' '}
        <Link href="/cookies" className="text-blue-500 hover:text-blue-700">
          this page.
        </Link>
      </section>

      {/* Rights */}
      <section className="max-w-3xl mt-7">
        <h1 className="font-bold text-2xl text-left mb-4">Rights</h1>
        You have a right to access the personal data we hold about you or obtain a copy of it. To do
        so please email us at [Insert email here] or contact us on discord. You also have the right
        to request the erasure of your personal data. Please contact us if you would like us to
        remove your personal data.
      </section>

      {/* Acceptance */}
      <section className="max-w-3xl mt-7">
        <h1 className="font-bold text-2xl text-left mb-4">Acceptance of this policy</h1>
        Continued use of our site signifies your acceptance of this policy. If you do not accept the
        policy then please do not use this site. When registering we will further request your
        explicit acceptance of the privacy policy.
      </section>

      {/* Changes */}
      <section className="max-w-3xl mt-7">
        <h1 className="font-bold text-2xl text-left mb-4">Changes to this policy</h1>
        We may make changes to this policy at any time. You may be asked to review and re-accept the
        information in this policy if it changes in the future.
      </section>
    </main>
  )
}
