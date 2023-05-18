import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Create = {
  content: Scalars['String'];
  header: Scalars['String'];
  tag: Scalars['String'];
};

export type Delete = {
  displayName: Scalars['String'];
  postId: Scalars['Float'];
};

export type Digits = {
  op: Scalars['String'];
  postId: Scalars['Float'];
};

export type Login = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createReply: Reply;
  deletePost: Post;
  deleteReply: Reply;
  deleteUser: User;
  likePost: Post;
  login: User;
  logout: Scalars['Boolean'];
  signup: User;
  updatePost: Post;
  updateUser: User;
};


export type MutationCreatePostArgs = {
  params: Create;
};


export type MutationCreateReplyArgs = {
  params: ReCreate;
};


export type MutationDeletePostArgs = {
  params: Delete;
};


export type MutationDeleteReplyArgs = {
  params: ReDelete;
};


export type MutationLikePostArgs = {
  params: Digits;
};


export type MutationLoginArgs = {
  params: Login;
};


export type MutationSignupArgs = {
  params: Signup;
};


export type MutationUpdatePostArgs = {
  params: Update;
};


export type MutationUpdateUserArgs = {
  params: UpdateUser;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  header: Scalars['String'];
  id: Scalars['Float'];
  likes: Scalars['Float'];
  owner: Scalars['String'];
  pinned?: Maybe<Scalars['Boolean']>;
  postId: Scalars['Float'];
  replies?: Maybe<Reply>;
  tag?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  post: Post;
  posts: Array<Post>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryPostArgs = {
  postId: Scalars['Float'];
};


export type QueryPostsArgs = {
  tag: Scalars['String'];
};

export type ReCreate = {
  content: Scalars['String'];
  postId: Scalars['Float'];
};

export type ReDelete = {
  displayName: Scalars['String'];
  id: Scalars['Float'];
};

export type Reply = {
  __typename?: 'Reply';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  displayName: Scalars['String'];
  id: Scalars['Float'];
  likes: Scalars['Float'];
  postId: Scalars['Float'];
  replyId: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type Signup = {
  displayName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Update = {
  content: Scalars['String'];
  owner: Scalars['String'];
  pinned: Scalars['Boolean'];
  postId: Scalars['Float'];
};

export type UpdateUser = {
  displayName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  pfp?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  displayName: Scalars['String'];
  id: Scalars['Float'];
  password: Scalars['String'];
  pfp?: Maybe<Scalars['String']>;
  posts?: Maybe<Post>;
  replies?: Maybe<Reply>;
  shoes?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type CreatePostMutationVariables = Exact<{
  header: Scalars['String'];
  content: Scalars['String'];
  tag: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', header: string, content: string, owner: string, tag?: string | null } };

export type CreateReplyMutationVariables = Exact<{
  postId: Scalars['Float'];
  content: Scalars['String'];
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: { __typename?: 'Reply', content: string, displayName: string } };

export type DeletePostMutationVariables = Exact<{
  displayName: Scalars['String'];
  postId: Scalars['Float'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'Post', postId: number, owner: string } };

export type LikePostMutationVariables = Exact<{
  op: Scalars['String'];
  postId: Scalars['Float'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'Post', postId: number, likes: number } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', displayName: string, pfp?: string | null } };

export type SignupMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  displayName: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', displayName: string, pfp?: string | null } };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['Float'];
  owner: Scalars['String'];
  pinned: Scalars['Boolean'];
  content: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', header: string, content: string, owner: string } };

export type UpdateUserMutationVariables = Exact<{
  displayName: Scalars['String'];
  pfp: Scalars['String'];
  password: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', displayName: string, pfp?: string | null } };

export type PostQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', header: string, content: string, owner: string, updatedAt: string } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, displayName: string, pfp?: string | null } | null };


export const CreatePostDocument = gql`
    mutation CreatePost($header: String!, $content: String!, $tag: String!) {
  createPost(params: {header: $header, content: $content, tag: $tag}) {
    header
    content
    owner
    tag
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const CreateReplyDocument = gql`
    mutation CreateReply($postId: Float!, $content: String!) {
  createReply(params: {postId: $postId, content: $content}) {
    content
    displayName
  }
}
    `;

export function useCreateReplyMutation() {
  return Urql.useMutation<CreateReplyMutation, CreateReplyMutationVariables>(CreateReplyDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($displayName: String!, $postId: Float!) {
  deletePost(params: {displayName: $displayName, postId: $postId}) {
    postId
    owner
  }
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const LikePostDocument = gql`
    mutation LikePost($op: String!, $postId: Float!) {
  likePost(params: {op: $op, postId: $postId}) {
    postId
    likes
  }
}
    `;

export function useLikePostMutation() {
  return Urql.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(params: {username: $username, password: $password}) {
    displayName
    pfp
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const SignupDocument = gql`
    mutation Signup($username: String!, $password: String!, $displayName: String!) {
  signup(
    params: {username: $username, password: $password, displayName: $displayName}
  ) {
    displayName
    pfp
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: Float!, $owner: String!, $pinned: Boolean!, $content: String!) {
  updatePost(
    params: {postId: $postId, owner: $owner, pinned: $pinned, content: $content}
  ) {
    header
    content
    owner
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($displayName: String!, $pfp: String!, $password: String!) {
  updateUser(params: {displayName: $displayName, pfp: $pfp, password: $password}) {
    displayName
    pfp
  }
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const PostDocument = gql`
    query Post($postId: Float!) {
  post(postId: $postId) {
    header
    content
    owner
    updatedAt
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>) {
  return Urql.useQuery<PostQuery, PostQueryVariables>({ query: PostDocument, ...options });
};
export const UserDocument = gql`
    query User {
  user {
    id
    displayName
    pfp
  }
}
    `;

export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};