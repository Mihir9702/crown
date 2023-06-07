import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Comment = {
  __typename?: 'Comment'
  commentid: Scalars['Float']
  content: Scalars['String']
  createdAt: Scalars['String']
  id: Scalars['Float']
  likes?: Maybe<Array<Scalars['Float']>>
  owner: Scalars['String']
  postid: Scalars['Float']
  updatedAt: Scalars['String']
}

export type Create = {
  content: Scalars['String']
  header: Scalars['String']
}

export type CreateComment = {
  content: Scalars['String']
  postid: Scalars['Float']
}

export type Delete = {
  nameid: Scalars['String']
  postid: Scalars['Float']
}

export type Input = {
  bio?: InputMaybe<Scalars['String']>
  nameid?: InputMaybe<Scalars['String']>
  password: Scalars['String']
  photoid?: InputMaybe<Scalars['String']>
  username: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createComment: Comment
  createPost: Post
  deleteComment: Scalars['Boolean']
  deletePost: Post
  deleteUser: Scalars['Boolean']
  likeComment: Comment
  likePost: Post
  login: User
  logout: Scalars['Boolean']
  signup: User
  unlikeComment: Comment
  unlikePost: Post
  updateComment: Comment
  updatePass: User
  updatePost: Post
  updateUser: User
}

export type MutationCreateCommentArgs = {
  params: CreateComment
}

export type MutationCreatePostArgs = {
  params: Create
}

export type MutationDeleteCommentArgs = {
  commentid: Scalars['Float']
}

export type MutationDeletePostArgs = {
  params: Delete
}

export type MutationLikeCommentArgs = {
  commentid: Scalars['Float']
}

export type MutationLikePostArgs = {
  postid: Scalars['Float']
}

export type MutationLoginArgs = {
  params: Input
}

export type MutationSignupArgs = {
  params: Input
}

export type MutationUnlikeCommentArgs = {
  commentid: Scalars['Float']
}

export type MutationUnlikePostArgs = {
  postid: Scalars['Float']
}

export type MutationUpdateCommentArgs = {
  params: UpdateComment
}

export type MutationUpdatePassArgs = {
  params: UpdatePass
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
  comment: Comment
  comments: Array<Comment>
  owner: Array<Post>
  post: Post
  postSearch: Array<Post>
  posts: Array<Post>
  user?: Maybe<User>
  userSearch: User
  users: Array<User>
}

export type QueryCommentArgs = {
  postid: Scalars['Float']
}

export type QueryCommentsArgs = {
  postid: Scalars['Float']
}

export type QueryOwnerArgs = {
  owner: Scalars['String']
}

export type QueryPostArgs = {
  postid: Scalars['Float']
}

export type QueryPostSearchArgs = {
  header: Scalars['String']
}

export type QueryUserSearchArgs = {
  nameid: Scalars['String']
}

export type Update = {
  header: Scalars['String']
  postid: Scalars['Float']
}

export type UpdateComment = {
  commentid: Scalars['Float']
  content: Scalars['String']
}

export type UpdatePass = {
  currPass: Scalars['String']
  newPass: Scalars['String']
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
  likes?: Maybe<Scalars['Float']>
  nameid: Scalars['String']
  password: Scalars['String']
  photoid?: Maybe<Scalars['String']>
  updatedAt: Scalars['String']
  userid: Scalars['Float']
  username: Scalars['String']
}

export type CommentFragmentFragment = {
  __typename?: 'Comment'
  owner: string
  content: string
  likes?: Array<number> | null
  postid: number
  commentid: number
  createdAt: string
}

export type PostFragmentFragment = {
  __typename?: 'Post'
  id: number
  header: string
  content: string
  owner: string
  likes?: Array<number> | null
  postid: number
  createdAt: string
  updatedAt: string
}

export type UserFragmentFragment = {
  __typename?: 'User'
  id: number
  nameid: string
  userid: number
  photoid?: string | null
  bio?: string | null
  likes?: number | null
  createdAt: string
}

export type CreateCommentMutationVariables = Exact<{
  params: CreateComment
}>

export type CreateCommentMutation = {
  __typename?: 'Mutation'
  createComment: {
    __typename?: 'Comment'
    owner: string
    content: string
    likes?: Array<number> | null
    postid: number
    commentid: number
    createdAt: string
  }
}

export type CreatePostMutationVariables = Exact<{
  params: Create
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost: {
    __typename?: 'Post'
    id: number
    header: string
    content: string
    owner: string
    likes?: Array<number> | null
    postid: number
    createdAt: string
    updatedAt: string
  }
}

export type DeletePostMutationVariables = Exact<{
  params: Delete
}>

export type DeletePostMutation = {
  __typename?: 'Mutation'
  deletePost: { __typename?: 'Post'; postid: number; owner: string }
}

export type LikeCommentMutationVariables = Exact<{
  commentid: Scalars['Float']
}>

export type LikeCommentMutation = {
  __typename?: 'Mutation'
  likeComment: {
    __typename?: 'Comment'
    owner: string
    content: string
    likes?: Array<number> | null
    postid: number
    commentid: number
    createdAt: string
  }
}

export type LikePostMutationVariables = Exact<{
  postid: Scalars['Float']
}>

export type LikePostMutation = {
  __typename?: 'Mutation'
  likePost: { __typename?: 'Post'; postid: number; likes?: Array<number> | null }
}

export type LoginMutationVariables = Exact<{
  params: Input
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'User'
    id: number
    nameid: string
    userid: number
    photoid?: string | null
    bio?: string | null
    likes?: number | null
    createdAt: string
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type SignupMutationVariables = Exact<{
  params: Input
}>

export type SignupMutation = {
  __typename?: 'Mutation'
  signup: { __typename?: 'User'; nameid: string; userid: number }
}

export type UnlikeCommentMutationVariables = Exact<{
  commentid: Scalars['Float']
}>

export type UnlikeCommentMutation = {
  __typename?: 'Mutation'
  unlikeComment: {
    __typename?: 'Comment'
    owner: string
    content: string
    likes?: Array<number> | null
    postid: number
    commentid: number
    createdAt: string
  }
}

export type UnlikePostMutationVariables = Exact<{
  postid: Scalars['Float']
}>

export type UnlikePostMutation = {
  __typename?: 'Mutation'
  unlikePost: { __typename?: 'Post'; postid: number; likes?: Array<number> | null }
}

export type UpdateCommentMutationVariables = Exact<{
  params: UpdateComment
}>

export type UpdateCommentMutation = {
  __typename?: 'Mutation'
  updateComment: { __typename?: 'Comment'; content: string }
}

export type UpdatePassMutationVariables = Exact<{
  params: UpdatePass
}>

export type UpdatePassMutation = {
  __typename?: 'Mutation'
  updatePass: {
    __typename?: 'User'
    id: number
    nameid: string
    userid: number
    photoid?: string | null
    bio?: string | null
    likes?: number | null
    createdAt: string
  }
}

export type UpdatePostMutationVariables = Exact<{
  params: Update
}>

export type UpdatePostMutation = {
  __typename?: 'Mutation'
  updatePost: { __typename?: 'Post'; header: string }
}

export type UpdateUserMutationVariables = Exact<{
  params: UpdateUser
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: { __typename?: 'User'; nameid: string; photoid?: string | null; bio?: string | null }
}

export type CommentQueryVariables = Exact<{
  postid: Scalars['Float']
}>

export type CommentQuery = {
  __typename?: 'Query'
  comment: {
    __typename?: 'Comment'
    owner: string
    content: string
    likes?: Array<number> | null
    postid: number
    commentid: number
    createdAt: string
  }
}

export type CommentsQueryVariables = Exact<{
  postid: Scalars['Float']
}>

export type CommentsQuery = {
  __typename?: 'Query'
  comments: Array<{
    __typename?: 'Comment'
    owner: string
    content: string
    likes?: Array<number> | null
    postid: number
    commentid: number
    createdAt: string
  }>
}

export type OwnerQueryVariables = Exact<{
  owner: Scalars['String']
}>

export type OwnerQuery = {
  __typename?: 'Query'
  owner: Array<{
    __typename?: 'Post'
    id: number
    header: string
    content: string
    owner: string
    likes?: Array<number> | null
    postid: number
    createdAt: string
    updatedAt: string
  }>
}

export type PostQueryVariables = Exact<{
  postid: Scalars['Float']
}>

export type PostQuery = {
  __typename?: 'Query'
  post: {
    __typename?: 'Post'
    id: number
    header: string
    content: string
    owner: string
    likes?: Array<number> | null
    postid: number
    createdAt: string
    updatedAt: string
  }
}

export type PostsQueryVariables = Exact<{ [key: string]: never }>

export type PostsQuery = {
  __typename?: 'Query'
  posts: Array<{
    __typename?: 'Post'
    id: number
    header: string
    content: string
    owner: string
    likes?: Array<number> | null
    postid: number
    createdAt: string
    updatedAt: string
  }>
}

export type UserQueryVariables = Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: number
    nameid: string
    userid: number
    photoid?: string | null
    bio?: string | null
    likes?: number | null
    createdAt: string
  } | null
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
    likes?: number | null
    createdAt: string
  }
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: number
    nameid: string
    userid: number
    photoid?: string | null
    bio?: string | null
    likes?: number | null
    createdAt: string
  }>
}

export const CommentFragmentFragmentDoc = gql`
  fragment CommentFragment on Comment {
    owner
    content
    likes
    postid
    commentid
    createdAt
  }
`
export const PostFragmentFragmentDoc = gql`
  fragment PostFragment on Post {
    id
    header
    content
    owner
    likes
    postid
    createdAt
    updatedAt
  }
`
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    nameid
    userid
    photoid
    bio
    likes
    createdAt
  }
`
export const CreateCommentDocument = gql`
  mutation CreateComment($params: CreateComment!) {
    createComment(params: $params) {
      ...CommentFragment
    }
  }
  ${CommentFragmentFragmentDoc}
`

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument
  )
}
export const CreatePostDocument = gql`
  mutation CreatePost($params: Create!) {
    createPost(params: $params) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument)
}
export const DeletePostDocument = gql`
  mutation DeletePost($params: Delete!) {
    deletePost(params: $params) {
      postid
      owner
    }
  }
`

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument)
}
export const LikeCommentDocument = gql`
  mutation LikeComment($commentid: Float!) {
    likeComment(commentid: $commentid) {
      ...CommentFragment
    }
  }
  ${CommentFragmentFragmentDoc}
`

export function useLikeCommentMutation() {
  return Urql.useMutation<LikeCommentMutation, LikeCommentMutationVariables>(LikeCommentDocument)
}
export const LikePostDocument = gql`
  mutation LikePost($postid: Float!) {
    likePost(postid: $postid) {
      postid
      likes
    }
  }
`

export function useLikePostMutation() {
  return Urql.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument)
}
export const LoginDocument = gql`
  mutation Login($params: Input!) {
    login(params: $params) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
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
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument)
}
export const SignupDocument = gql`
  mutation Signup($params: Input!) {
    signup(params: $params) {
      nameid
      userid
    }
  }
`

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument)
}
export const UnlikeCommentDocument = gql`
  mutation UnlikeComment($commentid: Float!) {
    unlikeComment(commentid: $commentid) {
      ...CommentFragment
    }
  }
  ${CommentFragmentFragmentDoc}
`

export function useUnlikeCommentMutation() {
  return Urql.useMutation<UnlikeCommentMutation, UnlikeCommentMutationVariables>(
    UnlikeCommentDocument
  )
}
export const UnlikePostDocument = gql`
  mutation UnlikePost($postid: Float!) {
    unlikePost(postid: $postid) {
      postid
      likes
    }
  }
`

export function useUnlikePostMutation() {
  return Urql.useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument)
}
export const UpdateCommentDocument = gql`
  mutation UpdateComment($params: UpdateComment!) {
    updateComment(params: $params) {
      content
    }
  }
`

export function useUpdateCommentMutation() {
  return Urql.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(
    UpdateCommentDocument
  )
}
export const UpdatePassDocument = gql`
  mutation UpdatePass($params: UpdatePass!) {
    updatePass(params: $params) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`

export function useUpdatePassMutation() {
  return Urql.useMutation<UpdatePassMutation, UpdatePassMutationVariables>(UpdatePassDocument)
}
export const UpdatePostDocument = gql`
  mutation UpdatePost($params: Update!) {
    updatePost(params: $params) {
      header
    }
  }
`

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument)
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($params: UpdateUser!) {
    updateUser(params: $params) {
      nameid
      photoid
      bio
    }
  }
`

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument)
}
export const CommentDocument = gql`
  query Comment($postid: Float!) {
    comment(postid: $postid) {
      ...CommentFragment
    }
  }
  ${CommentFragmentFragmentDoc}
`

export function useCommentQuery(options: Omit<Urql.UseQueryArgs<CommentQueryVariables>, 'query'>) {
  return Urql.useQuery<CommentQuery, CommentQueryVariables>({ query: CommentDocument, ...options })
}
export const CommentsDocument = gql`
  query Comments($postid: Float!) {
    comments(postid: $postid) {
      ...CommentFragment
    }
  }
  ${CommentFragmentFragmentDoc}
`

export function useCommentsQuery(
  options: Omit<Urql.UseQueryArgs<CommentsQueryVariables>, 'query'>
) {
  return Urql.useQuery<CommentsQuery, CommentsQueryVariables>({
    query: CommentsDocument,
    ...options,
  })
}
export const OwnerDocument = gql`
  query Owner($owner: String!) {
    owner(owner: $owner) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`

export function useOwnerQuery(options: Omit<Urql.UseQueryArgs<OwnerQueryVariables>, 'query'>) {
  return Urql.useQuery<OwnerQuery, OwnerQueryVariables>({ query: OwnerDocument, ...options })
}
export const PostDocument = gql`
  query Post($postid: Float!) {
    post(postid: $postid) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>) {
  return Urql.useQuery<PostQuery, PostQueryVariables>({ query: PostDocument, ...options })
}
export const PostsDocument = gql`
  query Posts {
    posts {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`

export function usePostsQuery(options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options })
}
export const UserDocument = gql`
  query User {
    user {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`

export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options })
}
export const UserSearchDocument = gql`
  query UserSearch($nameid: String!) {
    userSearch(nameid: $nameid) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`

export function useUserSearchQuery(
  options: Omit<Urql.UseQueryArgs<UserSearchQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserSearchQuery, UserSearchQueryVariables>({
    query: UserSearchDocument,
    ...options,
  })
}
export const UsersDocument = gql`
  query Users {
    users {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options })
}
