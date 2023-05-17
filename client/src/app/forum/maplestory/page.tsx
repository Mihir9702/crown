import React from "react";
import Image from "next/image";
import Crown from "@/assets/crown.png";
import Pagination from "@/components/Pagination";

export default () => {
  return (
    <main className="flex flex-col items-center h-screen justify-around bg-transparent py-16 bg-[#24272a] border-2 border-white max-w-[90%] mx-[5%]">
      <section className="flex flex-col gap-4 w-full max-w-7xl shadow-2xl">
        <div className="border-2 text-gray-300 border-gray-400 rounded-md p-2 cursor-pointer bg-gray-950 shadow-lg hover:bg-[#1e2021] hover:text-white">
          <h1 className="text-lg px-3">Announcements</h1>
          <p className="text-sm px-3">Where to start, how to do</p>
        </div>

        <div className="border-2 text-gray-300 border-gray-400 rounded-md p-2 cursor-pointer bg-gray-950 shadow-lg hover:bg-[#1e2021] hover:text-white">
          <h1 className="text-lg px-3">Updates</h1>
          <p className="text-sm px-3">Changes to games or policies</p>
        </div>

        <div className="border-2 text-gray-300 border-gray-400 rounded-md p-2 cursor-pointer bg-gray-950 shadow-lg hover:bg-[#1e2021] hover:text-white">
          <h1 className="text-lg px-3">Bug-Report</h1>
          <p className="text-sm px-3">
            Any bug detected should be notified here
          </p>
        </div>

        <div className="border-2 text-gray-300 border-gray-400 rounded-md p-2 cursor-pointer bg-gray-950 shadow-lg hover:bg-[#1e2021] hover:text-white">
          <h1 className="text-lg px-3">FAQ</h1>
          <p className="text-sm px-3">Frequently Asked Questions</p>
        </div>
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
        <div className="border-2 text-gray-300 border-gray-400 rounded-md p-2 cursor-pointer bg-gray-950 shadow-lg hover:bg-[#1e2021] hover:text-white">
          <h1 className="text-lg px-3">Accounts</h1>
          <p className="text-sm px-3">Sell your maplestory account for $$$</p>
        </div>

        <div className="border-2 text-gray-300 border-gray-400 rounded-md p-2 cursor-pointer bg-gray-950 shadow-lg hover:bg-[#1e2021] hover:text-white">
          <h1 className="text-lg px-3">LVL Services</h1>
          <p className="text-sm px-3">Selling leech or level services</p>
        </div>

        <div className="border-2 text-gray-300 border-gray-400 rounded-md p-2 cursor-pointer bg-gray-950 shadow-lg hover:bg-[#1e2021] hover:text-white">
          <h1 className="text-lg px-3">Guides</h1>
          <p className="text-sm px-3">Content guides for progression</p>
        </div>

        <div className="border-2 text-gray-300 border-gray-400 rounded-md p-2 cursor-pointer bg-gray-950 shadow-lg hover:bg-[#1e2021] hover:text-white">
          <h1 className="text-lg px-3">Other</h1>
          <p className="text-sm px-3">ETC Tab</p>
        </div>
      </section>

      <Pagination />
    </main>
  );
};
