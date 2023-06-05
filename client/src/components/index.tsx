import responseHandler from './responseHandler'
import Header from './Header'
import Footer from './Footer'
import UserCard from './UserCard'
import Card from './Card'
import Button from './Button'
import { ItemDisplay } from './ItemDisplay'

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

export { responseHandler, Header, Footer, UserCard, Card, Button, ItemDisplay }
