import {
  Resolver,
  Query,
  Arg,
  InputType,
  Mutation,
  Field,
  Ctx,
  UseMiddleware,
} from 'type-graphql'
import { Post } from '../model/Post'
import { MyContext } from '../types'
import { generateNumber } from '../consts'
import { isAuth } from '../middleware/isAuth'
import { User } from '../model/User'

@InputType()
class Create {
  @Field()
  header!: string

  @Field()
  content!: string
}

@InputType()
class Update {
  @Field()
  postId!: number

  @Field()
  owner!: string

  @Field()
  pinned?: boolean

  @Field()
  content!: string
}

@InputType()
class Delete {
  @Field()
  username!: string

  @Field()
  postId!: number
}

@Resolver()
export class PostResolver {
  @Query(() => Post)
  async post(@Arg('postId') postId: number): Promise<Post> {
    return await Post.findOne({ where: { postId: postId } })
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('params') params: Create,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    const user = await User.findOne({
      where: { username: req.session.username },
    })

    const post = await Post.create({
      header: params.header,
      content: params.content,
      owner: user.username,
      likes: 0,
      pinned: false,
      postId: generateNumber(4),
    }).save()

    user.posts.push(post)

    await User.save(user)

    return post
  }

  // !!
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(@Arg('params') params: Update): Promise<Post> {
    const post = await Post.findOne({
      where: { postId: params.postId },
    })

    return await Post.save(post)
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async likePost(@Arg('postId') postId: number): Promise<Post> {
    const post = await Post.findOne({ where: { postId } })

    post.likes += 1

    const user = await User.findOne({ where: { username: post.owner } })

    user.likes += 1

    await User.save(user)

    return await Post.save(post)
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg('params') params: Delete,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const post = await Post.findOne({
      where: { postId: params.postId },
    })

    if (post.owner !== req.session.username) return false

    const user = await User.findOne({
      where: { username: req.session.username },
    })

    user.likes -= post.likes

    await User.save(user)
    await Post.remove(post)

    return true
  }
}
