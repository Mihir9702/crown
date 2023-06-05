import React from 'react'

export default (
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
  return (
    <button
      className={`bg-blue-600 font-bold px-3 py-1 hover:bg-blue-700 hover:transition-all rounded-lg ${props.className}`}
    >
      {props.children}
    </button>
  )
}
