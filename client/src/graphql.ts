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
  postId: Scalars['Float']
  username: Scalars['String']
}

export type Input = {
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
}

export type MutationCreatePostArgs = {
  params: Create
}

export type MutationDeletePostArgs = {
  params: Delete
}

export type MutationLikePostArgs = {
  postId: Scalars['Float']
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

export type Post = {
  __typename?: 'Post'
  content: Scalars['String']
  createdAt: Scalars['String']
  header: Scalars['String']
  id: Scalars['Float']
  likes: Scalars['Float']
  owner: Scalars['String']
  pinned?: Maybe<Scalars['Boolean']>
  postId: Scalars['Float']
  updatedAt: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  post: Post
  posts: Array<Post>
  user?: Maybe<User>
  users: Array<User>
}

export type QueryPostArgs = {
  postId: Scalars['Float']
}

export type Update = {
  header: Scalars['String']
  postId: Scalars['Float']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['String']
  id: Scalars['Float']
  likes: Scalars['Float']
  password: Scalars['String']
  posts?: Maybe<Post>
  updatedAt: Scalars['String']
  username: Scalars['String']
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
  username: Scalars['String']
  postId: Scalars['Float']
}>

export type DeletePostMutation = {
  __typename?: 'Mutation'
  deletePost: { __typename?: 'Post'; postId: number; owner: string }
}

export type LikePostMutationVariables = Exact<{
  postId: Scalars['Float']
}>

export type LikePostMutation = {
  __typename?: 'Mutation'
  likePost: { __typename?: 'Post'; postId: number; likes: number }
}

export type LoginMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: { __typename?: 'User'; username: string }
}

export type SignupMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type SignupMutation = {
  __typename?: 'Mutation'
  signup: { __typename?: 'User'; username: string }
}

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['Float']
  header: Scalars['String']
}>

export type UpdatePostMutation = {
  __typename?: 'Mutation'
  updatePost: { __typename?: 'Post'; header: string }
}

export type PostQueryVariables = Exact<{
  postId: Scalars['Float']
}>

export type PostQuery = {
  __typename?: 'Query'
  post: {
    __typename?: 'Post'
    postId: number
    header: string
    content: string
    owner: string
    updatedAt: string
  }
}

export type PostsQueryVariables = Exact<{ [key: string]: never }>

export type PostsQuery = {
  __typename?: 'Query'
  posts: Array<{
    __typename?: 'Post'
    postId: number
    header: string
    content: string
    owner: string
    likes: number
    updatedAt: string
  }>
}

export type UserQueryVariables = Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: number
    username: string
    likes: number
  } | null
}

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
  mutation DeletePost($username: String!, $postId: Float!) {
    deletePost(params: { username: $username, postId: $postId }) {
      postId
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
  mutation LikePost($postId: Float!) {
    likePost(postId: $postId) {
      postId
      likes
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
export const SignupDocument = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(params: { username: $username, password: $password }) {
      username
    }
  }
`

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument
  )
}
export const UpdatePostDocument = gql`
  mutation UpdatePost($postId: Float!, $header: String!) {
    updatePost(params: { postId: $postId, header: $header }) {
      header
    }
  }
`

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument
  )
}
export const PostDocument = gql`
  query Post($postId: Float!) {
    post(postId: $postId) {
      postId
      header
      content
      owner
      updatedAt
    }
  }
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
      postId
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
      username
      likes
    }
  }
`

export function useUserQuery(
  options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({
    query: UserDocument,
    ...options,
  })
}
