import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Create = {
  content: Scalars['String']
  header: Scalars['String']
}

export type Delete = {
  nameid: Scalars['String']
  postid: Scalars['Float']
}

export type Input = {
  nameid?: InputMaybe<Scalars['String']>
  password: Scalars['String']
  username: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createPost: Post
  deletePost: Post
  deleteUser: User
  likePost: Post
  login: User
  logout: Scalars['Boolean']
  signup: User
  updatePost: Post
  updateUser: User
}

export type MutationCreatePostArgs = {
  params: Create
}

export type MutationDeletePostArgs = {
  params: Delete
}

export type MutationLikePostArgs = {
  postid: Scalars['Float']
  userid: Scalars['Float']
}

export type MutationLoginArgs = {
  params: Input
}

export type MutationSignupArgs = {
  params: Input
}

export type MutationUpdatePostArgs = {
  params: Update
}

export type MutationUpdateUserArgs = {
  params: UpdateUser
}

export type Post = {
  __typename?: 'Post'
  content: Scalars['String']
  createdAt: Scalars['String']
  header: Scalars['String']
  id: Scalars['Float']
  likes?: Maybe<Array<Scalars['Float']>>
  owner: Scalars['String']
  pinned?: Maybe<Scalars['Boolean']>
  postid: Scalars['Float']
  updatedAt: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  owner: Array<Post>
  post: Post
  posts: Array<Post>
  user: User
  userSearch: User
  users: Array<User>
}

export type QueryOwnerArgs = {
  owner: Scalars['String']
}

export type QueryPostArgs = {
  postid: Scalars['Float']
}

export type QueryUserSearchArgs = {
  nameid: Scalars['String']
}

export type Update = {
  header: Scalars['String']
  postid: Scalars['Float']
}

export type UpdateUser = {
  bio?: InputMaybe<Scalars['String']>
  nameid?: InputMaybe<Scalars['String']>
  photoid?: InputMaybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  bio?: Maybe<Scalars['String']>
  createdAt: Scalars['String']
  id: Scalars['Float']
  likes: Scalars['Float']
  nameid: Scalars['String']
  password: Scalars['String']
  photoid?: Maybe<Scalars['String']>
  posts?: Maybe<Array<Post>>
  updatedAt: Scalars['String']
  userid: Scalars['Float']
  username: Scalars['String']
}

export type PostFragmentFragment = {
  __typename?: 'Post'
  header: string
  content: string
  owner: string
  postid: number
}

export type CreatePostMutationVariables = Exact<{
  header: Scalars['String']
  content: Scalars['String']
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost: {
    __typename?: 'Post'
    header: string
    content: string
    owner: string
  }
}

export type DeletePostMutationVariables = Exact<{
  nameid: Scalars['String']
  postid: Scalars['Float']
}>

export type DeletePostMutation = {
  __typename?: 'Mutation'
  deletePost: { __typename?: 'Post'; postid: number; owner: string }
}

export type LikePostMutationVariables = Exact<{
  postid: Scalars['Float']
  userid: Scalars['Float']
}>

export type LikePostMutation = {
  __typename?: 'Mutation'
  likePost: { __typename?: 'Post'; postid: number }
}

export type LoginMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: { __typename?: 'User'; username: string }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type SignupMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
  nameid?: InputMaybe<Scalars['String']>
}>

export type SignupMutation = {
  __typename?: 'Mutation'
  signup: { __typename?: 'User'; nameid: string; userid: number }
}

export type UpdatePostMutationVariables = Exact<{
  postid: Scalars['Float']
  header: Scalars['String']
}>

export type UpdatePostMutation = {
  __typename?: 'Mutation'
  updatePost: { __typename?: 'Post'; header: string }
}

export type UpdateUserMutationVariables = Exact<{
  nameid: Scalars['String']
  photoid: Scalars['String']
  bio: Scalars['String']
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: {
    __typename?: 'User'
    nameid: string
    photoid?: string | null
    bio?: string | null
  }
}

export type OwnerQueryVariables = Exact<{
  owner: Scalars['String']
}>

export type OwnerQuery = {
  __typename?: 'Query'
  owner: Array<{
    __typename?: 'Post'
    header: string
    content: string
    owner: string
    postid: number
  }>
}

export type PostQueryVariables = Exact<{
  postid: Scalars['Float']
}>

export type PostQuery = {
  __typename?: 'Query'
  post: {
    __typename?: 'Post'
    header: string
    content: string
    owner: string
    postid: number
  }
}

export type PostsQueryVariables = Exact<{ [key: string]: never }>

export type PostsQuery = {
  __typename?: 'Query'
  posts: Array<{
    __typename?: 'Post'
    postid: number
    header: string
    content: string
    owner: string
    likes?: Array<number> | null
    updatedAt: string
  }>
}

export type UserQueryVariables = Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    id: number
    nameid: string
    userid: number
    photoid?: string | null
    bio?: string | null
    likes: number
    posts?: Array<{
      __typename?: 'Post'
      header: string
      content: string
      owner: string
      postid: number
    }> | null
  }
}

export type UserSearchQueryVariables = Exact<{
  nameid: Scalars['String']
}>

export type UserSearchQuery = {
  __typename?: 'Query'
  userSearch: {
    __typename?: 'User'
    id: number
    nameid: string
    userid: number
    photoid?: string | null
    bio?: string | null
    likes: number
    posts?: Array<{
      __typename?: 'Post'
      header: string
      content: string
      owner: string
      postid: number
    }> | null
  }
}

export const PostFragmentFragmentDoc = gql`
  fragment PostFragment on Post {
    header
    content
    owner
    postid
  }
`
export const CreatePostDocument = gql`
  mutation CreatePost($header: String!, $content: String!) {
    createPost(params: { header: $header, content: $content }) {
      header
      content
      owner
    }
  }
`

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument
  )
}
export const DeletePostDocument = gql`
  mutation DeletePost($nameid: String!, $postid: Float!) {
    deletePost(params: { nameid: $nameid, postid: $postid }) {
      postid
      owner
    }
  }
`

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument
  )
}
export const LikePostDocument = gql`
  mutation LikePost($postid: Float!, $userid: Float!) {
    likePost(postid: $postid, userid: $userid) {
      postid
    }
  }
`

export function useLikePostMutation() {
  return Urql.useMutation<LikePostMutation, LikePostMutationVariables>(
    LikePostDocument
  )
}
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(params: { username: $username, password: $password }) {
      username
    }
  }
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  )
}
export const SignupDocument = gql`
  mutation Signup($username: String!, $password: String!, $nameid: String) {
    signup(
      params: { username: $username, password: $password, nameid: $nameid }
    ) {
      nameid
      userid
    }
  }
`

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument
  )
}
export const UpdatePostDocument = gql`
  mutation UpdatePost($postid: Float!, $header: String!) {
    updatePost(params: { postid: $postid, header: $header }) {
      header
    }
  }
`

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument
  )
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($nameid: String!, $photoid: String!, $bio: String!) {
    updateUser(params: { nameid: $nameid, photoid: $photoid, bio: $bio }) {
      nameid
      photoid
      bio
    }
  }
`

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument
  )
}
export const OwnerDocument = gql`
  query Owner($owner: String!) {
    owner(owner: $owner) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`

export function useOwnerQuery(
  options: Omit<Urql.UseQueryArgs<OwnerQueryVariables>, 'query'>
) {
  return Urql.useQuery<OwnerQuery, OwnerQueryVariables>({
    query: OwnerDocument,
    ...options,
  })
}
export const PostDocument = gql`
  query Post($postid: Float!) {
    post(postid: $postid) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`

export function usePostQuery(
  options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>
) {
  return Urql.useQuery<PostQuery, PostQueryVariables>({
    query: PostDocument,
    ...options,
  })
}
export const PostsDocument = gql`
  query Posts {
    posts {
      postid
      header
      content
      owner
      likes
      updatedAt
    }
  }
`

export function usePostsQuery(
  options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>
) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    ...options,
  })
}
export const UserDocument = gql`
  query User {
    user {
      id
      nameid
      userid
      photoid
      bio
      likes
      posts {
        ...PostFragment
      }
    }
  }
  ${PostFragmentFragmentDoc}
`

export function useUserQuery(
  options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({
    query: UserDocument,
    ...options,
  })
}
export const UserSearchDocument = gql`
  query UserSearch($nameid: String!) {
    userSearch(nameid: $nameid) {
      id
      nameid
      userid
      photoid
      bio
      likes
      posts {
        ...PostFragment
      }
    }
  }
  ${PostFragmentFragmentDoc}
`

export function useUserSearchQuery(
  options: Omit<Urql.UseQueryArgs<UserSearchQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserSearchQuery, UserSearchQueryVariables>({
    query: UserSearchDocument,
    ...options,
  })
}
