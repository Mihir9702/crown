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
class Num {
  @Field()
  op: string

  @Field()
  postId: number
}

@Resolver()
export class PostResolver {
  @Query(() => Post)
  async post(@Arg('postId') postId: number): Promise<Post> {
    return Post.findOne({ where: { postId: postId } })
  }

  @Query(() => [Post])
  async posts(@Arg('tag') tag: string): Promise<Post[]> {
    return Post.find({ where: { tag: tag } })
  }

  @Mutation(() => [Post])
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('params') params: Create,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    if (req.session.displayName) {
      const randomNumber = generateNumber(4)

      const post = await Post.create({
        header: params.header,
        content: params.content,
        owner: req.session.displayName,
        likes: 0,
        postId: randomNumber,
      }).save()
      return post
    } else {
      throw new Error('Please log in')
    }
  }

  @Mutation(() => [Post])
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg('params') params: Update,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    if (req.session.displayName && req.session.displayName === params.owner) {
      const post = await Post.findOne({
        where: { postId: params.postId },
      })

      post.pinned = params.pinned
      post.content = params.content

      await Post.save(post)

      return post
    } else {
      throw new Error('Please log in')
    }
  }

  @Mutation(() => [Post])
  @UseMiddleware(isAuth)
  async likePost(
    @Arg('params') params: Num,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    if (req.session.displayName) {
      const post = await Post.findOne({
        where: { postId: params.postId },
      })

      params.op === 'like'
        ? (post.likes = post.likes + 1)
        : (post.likes = post.likes - 1)

      Post.save(post)

      return post
    } else {
      throw new Error('Please log in')
    }
  }
}
