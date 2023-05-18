import {
  Resolver,
  Arg,
  InputType,
  Mutation,
  Field,
  Ctx,
  UseMiddleware,
} from 'type-graphql'
import { MyContext } from '../types'
import { Reply } from '../model/Reply'
import { Post } from '../model/Post'
import { generateNumber } from '../consts'
import { isAuth } from '../middleware/isAuth'

@InputType()
class ReCreate {
  @Field()
  postId!: number

  @Field()
  content!: string
}

@InputType()
class ReDelete {
  @Field()
  id!: number

  @Field()
  displayName!: string
}
@Resolver()
export class ReplyResolver {
  @Mutation(() => Reply)
  @UseMiddleware(isAuth)
  async createReply(
    @Arg('params') params: ReCreate,
    @Ctx() { req }: MyContext
  ): Promise<Reply> {
    const reply = await Reply.create({
      postId: params.postId,
      content: params.content,
      likes: 0,
      displayName: req.session.displayName,
      replyId: generateNumber(4),
    }).save()

    const post = await Post.findOne({
      where: { postId: params.postId },
    })
    post.replies.push(reply)

    Post.save(post)

    return reply
  }

  @Mutation(() => Reply)
  @UseMiddleware(isAuth)
  async deleteReply(
    @Arg('params') params: ReDelete,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const reply = await Reply.findOne({
      where: { id: params.id },
    })

    if (req.session.displayName === reply.displayName) {
      await reply.remove()
      return true
    }
  }
}
