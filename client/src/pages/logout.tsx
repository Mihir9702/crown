import { useRouter } from 'next/navigation'
import { useLogoutMutation } from '@/graphql'
import { useEffect } from 'react'

export default function Logout() {
  const router = useRouter()
  const [, logout] = useLogoutMutation()

  useEffect(() => {
    async function action() {
      const response = await logout({})
      if (response.error) return

      if (response) {
        return router.push('/')
      }
    }
    action()
  }, [])

  return <></>
}
