import React from "react";
import Image from "next/image";
import Link from "@/components/Link";
import Crown from "@/assets/crown.png";

export default () => {
  const link = "/forum/maplestory/";
  // get post
  // postid = url
  return (
    <main className="flex flex-col items-center min-h-screen justify-around bg-transparent py-16 bg-[#24272a] border-2 border-white max-w-[90%] mx-[5%]">
      <section className="flex flex-col gap-4 w-full max-w-7xl shadow-2xl">
        {/* <Link
          href={link + "announcements"}
          title="Announcements"
          text="Where to go, what to do?"
        />

        <Link
          href={link + "updates"}
          title="Updates"
          text="Changes to games or policies"
        />

        <Link
          href={link + "bug-report"}
          title="Bug-Report"
          text="Any bug detected should be notified here"
        />

        <Link
          href={link + "faq"}
          title="FAQ"
          text="Frequently Asked Questions"
        /> */}
      </section>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={Crown}
          alt="Crown Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <section className="flex flex-col gap-4 w-full max-w-7xl shadow-2xl">
        {/* <Link
          href={link + "announcements"}
          title="Announcements"
          text="Where to go, what to do?"
        />

        <Link
          href={link + "updates"}
          title="Updates"
          text="Changes to games or policies"
        />

        <Link
          href={link + "bug-report"}
          title="Bug-Report"
          text="Any bug detected should be notified here"
        />

        <Link
          href={link + "faq"}
          title="FAQ"
          text="Frequently Asked Questions"
        /> */}
      </section>
    </main>
  );
};
