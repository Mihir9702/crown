import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLogoutMutation } from '@/graphql'

export default () => {
  const router = useRouter()
  const [, logout] = useLogoutMutation()
  const [x, isX] = useState<string>('')

  const handleLogout = async () => {
    const response = await logout({})
    if (response.error?.graphQLErrors[0]) {
      isX(response.error.graphQLErrors[0].message)
    } else {
      router.replace('/')
    }
  }

  handleLogout()

  return <div>{x}</div>
}
