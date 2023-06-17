import { ResponseHandler } from './types'

export function responseHandler(props: ResponseHandler) {
  if (props.response.error?.graphQLErrors) {
    props.setError(props.response.error.graphQLErrors[0].message)
  } else {
    props.action === 'back' ? props.router.back() : props.router.push('/')
    location.reload()
  }
}
