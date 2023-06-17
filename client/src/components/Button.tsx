import React from 'react'

export default (
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
  let color
  if (props.color === 'blue') {
    color = 'bg-blue-600 hover:bg-blue-700'
  } else if (props.color === 'violet') {
    color = 'bg-violet-600 hover:bg-violet-700'
  } else if (props.color === 'dark') {
    color = 'bg-lightdark hover:bg-dark hover:text-text'
  }
  return (
    <button
      className={`${color} font-bold px-3 py-1 hover:transition-all rounded-lg no-underline ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  )
}
