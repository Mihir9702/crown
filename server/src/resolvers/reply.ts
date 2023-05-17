import { Resolver, Arg, InputType, Mutation, Field, Ctx } from 'type-graphql'
import { MyContext } from '../types'
import { Reply } from '../model/Reply'
import { Post } from '../model/Post'
import { generateNumber } from '../helpers'

@InputType()
class Create {
  @Field()
  postId!: number

  @Field()
  content!: string
}

@InputType()
class Update {
  @Field()
  displayName!: string

  @Field()
  content!: string

  @Field()
  replyId!: number
}

@Resolver()
export class ReplyResolver {
  @Mutation(() => [Reply])
  async createReply(
    @Arg('params') params: Create,
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

  @Mutation(() => [Reply])
  async updateReply(
    @Arg('params') params: Update,
    @Ctx() { req }: MyContext
  ): Promise<Reply> {
    if (
      req.session.displayName &&
      req.session.displayName === params.displayName
    ) {
      const reply = await Reply.findOne({
        where: { replyId: params.replyId },
      })

      reply.content = params.content

      await Reply.save(reply)

      return reply
    } else {
      throw new Error('Please log in')
    }
  }
}
