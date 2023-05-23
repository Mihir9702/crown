import { useRouter } from 'next/navigation'
import { useUserQuery } from '../graphql'

// [X] ** graphql.ts generation + client / provider (!urql) on frontend
// 1. GraphQL Playground -> Create User, Create Post, Read Post, Create Another User, View Post, Like Post, Check User for @posts and @likes
// [X] 2. App -> S/L, Profile (Load Posts / Settings), Create Post, Display Posts
// [X] 3. Image storage / upload
// 3.5. Update: post.content, user.nameid (rng), user.savedposts (resolver), user.pic (input type file)
// 4. Tweaks

export default () => {
  const [{ data, fetching }] = useUserQuery()

  const user = data?.user

  const router = useRouter()

  if (fetching) {
    return <div>Loading...</div>
  } else if (!user || user.id) {
    router.push('/login')
  } else if (user) {
    router.push('/home')
  }
}
