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

export type Login = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createReply: Array<Reply>;
  likePost: Post;
  login: User;
  logout: Scalars['Boolean'];
  signup: User;
  updatePost: Post;
  updateReply: Array<Reply>;
};


export type MutationCreatePostArgs = {
  params: Create;
};


export type MutationCreateReplyArgs = {
  params: ReCreate;
};


export type MutationLikePostArgs = {
  params: Num;
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


export type MutationUpdateReplyArgs = {
  params: ReUpdate;
};

export type Num = {
  op: Scalars['String'];
  postId: Scalars['Float'];
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

export type ReUpdate = {
  content: Scalars['String'];
  displayName: Scalars['String'];
  replyId: Scalars['Float'];
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

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, displayName: string } | null };


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
export const UserDocument = gql`
    query User {
  user {
    id
    displayName
  }
}
    `;

export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};