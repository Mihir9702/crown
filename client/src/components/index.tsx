import responseHandler from './responseHandler'
import Header from './Header'
import Footer from './Footer'
import UserCard from './UserCard'
import Card from './Card'
import Button from './Button'
import Comment from './Comment'
import { ItemDisplay } from './ItemDisplay'
import { Post } from '@/graphql'

export const helpid = (title: string) => {
  return {
    'data-te-toggle': 'tooltip',
    'data-te-placement': 'bottom',
    'data-te-ripple-init': true,
    'data-te-ripple-color': 'light',
    title: title,
  }
}

export function formatPostTime(milliseconds: number): string {
  const currentTime = new Date().getTime()
  const timeDifference = currentTime - milliseconds
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)

  if (weeks > 0) {
    return `${weeks}w`
  } else if (days > 0) {
    return `${days}d`
  } else if (hours > 0) {
    return `${hours}h`
  } else {
    return `${minutes}m`
  }
}

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

export { responseHandler, Header, Footer, UserCard, Card, Button, Comment, ItemDisplay }
