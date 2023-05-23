import Link from 'next/link'
import Image from 'next/image'
import Crown from '@/components/Crown'
import Header from '@/components/Header'
import { usePostsQuery } from '@/graphql'

export default () => {
  const [{ data }] = usePostsQuery()
  const posts = data?.posts

  // ! create post -> show post
  return (
    <main className="flex min-h-screen flex-col w-full items-center mt-8">
      <Header h={false} e={true} p={true} c={true} />

      <Crown />

      {posts &&
        posts.map(post => (
          <a
            href={`/p/${post.postId}`}
            className="w-full h-[720px] rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link href={`/u/${post.owner}`}>
              <p className={`mb-2 text-sm text-left opacity-50`}>
                {post.owner}
              </p>
            </Link>
            <h2 className={`mb-3 text-xl text-left font-semibold`}>
              {post.header}
            </h2>
            <div className="flex justify-center mt-4">
              <Image
                src={post.content}
                alt=""
                className="max-h-[512px] w-[32rem] h-full rounded-md"
              />
            </div>
            <p className="text-gray-300 text-sm mt-3 ml-2 text-left">
              {post.likes} likes
            </p>
            <button className="text-3xl">💖</button>
          </a>
        ))}
    </main>
  )
}
