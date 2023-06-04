import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { Dispatch, SetStateAction } from 'react'

export default (
  response: any,
  setError: Dispatch<SetStateAction<string | undefined>>,
  clientRouter: AppRouterInstance,
  action?: string
) => {
  if (response.error?.graphQLErrors) {
    setError(response.error.graphQLErrors[0].message)
  } else {
    location.reload()
    action === 'back' ? clientRouter.back() : clientRouter.push('/')
  }
}
