import Image from "next/image";
import Link from "next/link";
import Crown from "@/assets/crown.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full items-center mt-8">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <div className="left-0 top-0 flex w-full justify-between gap-8 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <div className="flex gap-8">
            <Link href="/">
              <p className="hover:text-gray-300 cursor-pointer">Home</p>
            </Link>
            <Link href="/about">
              <p className="hover:text-gray-300 cursor-pointer">About</p>
            </Link>
          </div>

          <div className="flex gap-8">
            <Link href="/explore">
              <p className="hover:text-gray-300 cursor-pointer">Explore</p>
            </Link>
          </div>

          <div className="flex gap-8">
            <Link href="/login">
              <p className="hover:text-gray-300 cursor-pointer">Login</p>
            </Link>
          </div>
        </div>
      </div>

      <Image
        //  image select none
        className="relative mt-2 dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src={Crown}
        alt="Crown Logo"
        width={180}
        height={37}
        priority
      />

      <section className="mt-12 text-center flex flex-col items-center w-[40%] gap-6">
        <a
          // href === postId
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="w-full h-[660px] rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className={`mb-2 text-sm text-left opacity-50`}>Disco3000</p>
          <h2 className={`mb-3 text-xl text-left font-semibold`}>
            Resident Evil (Cleopetra)
          </h2>
          <p>Image</p>
          <button className="text-4xl mt-2">💖</button>
        </a>
      </section>

      {/* footer */}
    </main>
  );
}
