import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { Dispatch, SetStateAction } from 'react'

export type PostIdProps = {
  header: string
  content: string
  owner: string
}

export type User = {
  __typename?: User | undefined
  id: number
  nameid: string
  userid: number
  photoid?: string | null | undefined
  bio?: string | null | undefined
  likes: number | null | undefined
}

export type ResponseHandler = {
  response: any
  setError: Dispatch<SetStateAction<string | undefined>>
  router: AppRouterInstance
  action?: string
}
