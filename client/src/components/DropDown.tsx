import { useState, useEffect } from 'react'
import Button from './Button'

interface DropDownProps {
  name: string
  items: string[] | number[]
}
export default ({ name, items }: DropDownProps) => {
  const [onClick, isOnClick] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>([])
  const [select, setSelect] = useState<string>('')

  useEffect(() => {
    if (select !== '') {
      setTags([...tags, select])
      setSelect('')
      localStorage.setItem('tags', JSON.stringify(tags))
    }
  }, [select])

  const css = {
    button: 'flex items-center text-text px-3 py-1 rounded-lg',
    items: 'py-2 ring-1 ring-white max-h-[300px] overflow-y-auto',
    item: 'text-text hover:bg-highlight block px-4 py-2 text-sm w-full text-left',
  }

  return (
    <>
      <div className="flex items-center gap-3 max-w-md flex-1 mb-3 flex-wrap text-left">
        {Array.from(new Set(tags)).map(tag => (
          <p key={tag} className="bg-note px-3 py-1 rounded-xl">
            {tag}
          </p>
        ))}
      </div>
      <div className="relative inline-block text-left">
        <Button
          className="flex-center"
          color="dark"
          type="button"
          onClick={() => isOnClick(!onClick)}
        >
          {name}
          <svg
            className="-mr-1 h-5 w-5 text-text"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
      {items.length > 0 && onClick && (
        <div
          className={css.items}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {items.map(item => (
            // add custom item
            <button
              key={item}
              tabIndex={-1}
              className={css.item}
              onClick={() => setSelect(String(item))}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
