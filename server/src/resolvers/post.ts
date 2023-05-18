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
import { MyContext, Posties } from '../types'
import { generateNumber } from '../consts'
import { isAuth } from '../middleware/isAuth'

@InputType()
class Create {
  @Field()
  header!: string

  @Field()
  content!: string

  @Field()
  tag!: string
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
    return await Post.findOne({ where: { postId: postId } })
  }

  @Query(() => [Post])
  async posts(@Arg('tag') tag: Posties): Promise<Post[]> {
    return await Post.find({ where: { tag: tag } })
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('params') params: Create,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return await Post.create({
      header: params.header,
      content: params.content,
      owner: req.session.displayName,
      likes: 0,
      postId: generateNumber(4),
      tag: params.tag,
    }).save()
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(@Arg('params') params: Update): Promise<Post> {
    const post = await Post.findOne({
      where: { postId: params.postId },
    })

    post.pinned = params.pinned
    post.content = params.content

    return await Post.save(post)
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async likePost(@Arg('params') params: Num): Promise<Post> {
    const post = await Post.findOne({
      where: { postId: params.postId },
    })

    params.op === 'like'
      ? (post.likes = post.likes + 1)
      : (post.likes = post.likes - 1)

    return await Post.save(post)
  }
}
