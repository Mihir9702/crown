import { Dispatch, SetStateAction } from 'react'

interface Props {
  setState: Dispatch<SetStateAction<boolean>>
}

export default ({ setState }: Props) => {
  return (
    <div className="flex gap-2">
      <p
        className="hover:text-gray-400 p-1 rounded-lg cursor-default"
        onClick={() => setState(false)}
      >
        <svg
          xmlns="http://www.w4.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-columns"
        >
          <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
        </svg>
      </p>

      <p
        className="hover:text-gray-400 rounded-lg cursor-default p-1"
        onClick={() => setState(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-grid"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </p>
    </div>
  )
}
