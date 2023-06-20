import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { Dispatch, SetStateAction } from 'react'

export declare type PostIdProps = {
  header: string
  content: string
  owner: string
}

export declare type User = {
  __typename?: User | undefined
  id: number
  nameid: string
  userid: number
  photoid?: string | null | undefined
  bio?: string | null | undefined
  likes: number | null | undefined

  posts: {
    __typename: 'Post' | undefined
    id: number
    postid: number
    header: string
    content: string
    likes: number[]
    createdAt: string
  }

  comments: {
    __typename: 'Comment' | undefined
    id: number
    commentid: number
    content: string
    likes: number[]
    createdAt: string
  }
}

export declare type ResponseHandler = {
  response: any
  setError: Dispatch<SetStateAction<string | undefined>>
  router: AppRouterInstance
  action?: string
}
