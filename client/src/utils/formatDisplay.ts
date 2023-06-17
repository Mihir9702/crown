import { Post } from './types'

export function formatDisplay(items: any[] | undefined, sort: string): Post[] | Comment[] {
  if (!items) return []

  if (sort === 'popular') {
    items?.sort((a, b) => {
      const likesA = a.likes ? a.likes.length : 0
      const likesB = b.likes ? b.likes.length : 0
      return likesB - likesA
    })
  } else if (sort === 'date') {
    items?.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
  }

  return items
}
