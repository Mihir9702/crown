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
