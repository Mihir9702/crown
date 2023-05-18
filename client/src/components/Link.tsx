"use client";

import Link from "next/link";

interface Props {
  href: string;
  title: string;
  text: string;
}

export default (props: Props) => {
  return (
    <Link
      href={props.href}
      className="border-2 text-gray-300 border-gray-400 rounded-md p-2 cursor-pointer bg-gray-950 shadow-lg hover:bg-[#1e2021] hover:text-white"
    >
      <h1 className="text-lg px-3">{props.title}</h1>
      <p className="text-sm px-3">{props.text}</p>
    </Link>
  );
};
