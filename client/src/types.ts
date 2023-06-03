import { Post } from './graphql'

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
  likes: number
  posts?:
    | {
        __typename?: Post | undefined
        header: string
        content: string
        owner: string
        postid: number
      }[]
    | null
    | undefined
}
