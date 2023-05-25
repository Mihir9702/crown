import Link from 'next/link'
import Image from 'next/image'
import Crown from '@/components/Crown'
import Header from '@/components/Header'
import { cookies } from 'next/headers'
import { useLikePostMutation, usePostsQuery, useUserQuery } from '@/graphql'

export default () => {
  const [{ data, fetching }] = usePostsQuery()
  const [{ data: user }] = useUserQuery()
  const posts = data?.posts
  const ud = user?.user.userid as number

  const [, like] = useLikePostMutation()
  let fetch

  console.log(posts)
  if (fetching) fetch = <div>Loading...</div>
  return (
    <main className="flex min-h-screen flex-col w-full gap-8 items-center mt-8">
      <Header h={false} e={true} p={true} c={true} />

      <Crown />

      {fetch && fetch}
      {posts &&
        posts.map(post => (
          <div
            key={post.postid}
            className="w-fit h-[720px] rounded-lg border border-transparent font-mono px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <Link href={`/u/${post.owner}`}>
              <p
                className={`mb-2 text-sm text-left opacity-50 hover:underline`}
              >
                {post.owner}
              </p>
            </Link>
            <Link
              href={`/p/${post.postid}`}
              className={`mb-3 text-xl text-left font-semibold`}
            >
              {post.header}
            </Link>
            <div className="flex justify-center mt-4">
              <Image
                src={post.content}
                alt=""
                width={600}
                height={375}
                className="max-h-[512px] w-[32rem] h-full rounded-md"
              />
            </div>
            <p className="text-gray-300 text-sm mt-3 ml-2 text-left">
              {post.likes ? post.likes : 0} likes
            </p>
            <button
              className="text-3xl"
              // onClick={e => handleLike(e, post.postid)}
              onClick={async () =>
                await like({ postid: post.postid, userid: ud })
              }
            >
              💖
            </button>
          </div>
        ))}
    </main>
  )
}
