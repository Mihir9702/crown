import 'dotenv/config'
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  UseMiddleware,
} from 'type-graphql'
import { CreateComment, MyContext, UpdateComment } from '../types'
import { isAuth } from '../middleware/isAuth'
import { User } from '../model/User'
import { Comment } from '../model/Comment'
import { randomNumber } from '../helpers/rand'

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  async comments(@Arg('postid') postid: number): Promise<Comment[] | null> {
    return await Comment.find({ where: { postid }, order: { createdAt: -1 } })
  }

  @Query(() => Comment)
  async comment(@Arg('postid') postid: number): Promise<Comment | null> {
    return await Comment.findOne({
      where: { postid },
      order: { createdAt: -1 },
    })
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg('params') params: CreateComment,
    @Ctx() { req }: MyContext
  ): Promise<Comment> {
    const owner = await User.findOne({
      where: { userid: req.session.userid },
    }).then(r => r?.nameid)
    if (!owner) throw new Error('[CC] - no user')
    const commentid = randomNumber(4)
    return await Comment.create({ ...params, owner, commentid }).save()
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async updateComment(
    @Arg('params') params: UpdateComment,
    @Ctx() { req }: MyContext
  ): Promise<Comment> {
    if (!req.session.userid) throw new Error('[UpdateComment] - No session id')

    const comment = await Comment.findOne({
      where: { commentid: params.commentid },
    })

    const user = await User.findOne({
      where: { userid: req.session.userid },
    })

    if (!user) throw new Error('[UpdateComment] - No user found')
    else if (!comment) throw new Error('[UpdateComment] - No comment found')
    else if (comment.owner !== user.nameid)
      throw new Error('[UpdateComment] - user did not create comment')

    comment.content = params.content

    return await Comment.save(comment)
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async likeComment(
    @Arg('commentid') commentid: number,
    @Ctx() { req }: MyContext
  ): Promise<Comment> {
    if (!req.session.userid) throw new Error('[LikeComment] - No session id')

    const comment = await Comment.findOne({ where: { commentid } })
    if (!comment) throw new Error('[LikeComment] - No comment found')

    if (!comment.likes) comment.likes = [req.session.userid]
    else comment.likes.push(req.session.userid)
    console.log('[comment] - comment.likes', comment.likes)

    const owner = await User.findOne({ where: { nameid: comment.owner } })
    if (!owner) throw new Error('[LikePost] - No user found')

    owner.likes += 1

    await User.save(owner)
    return await Comment.save(comment)
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async unlikeComment(
    @Arg('commentid') commentid: number,
    @Ctx() { req }: MyContext
  ): Promise<Comment> {
    if (!req.session.userid) throw new Error('[UnlikeComment] - Please log in')

    const comment = await Comment.findOne({ where: { commentid } })
    if (!comment) throw new Error('[Unlikecomment] - No comment found')

    const idx = comment.likes?.indexOf(req.session.userid)

    if (idx) {
      comment.likes?.splice(idx, 1)
    }

    const owner = await User.findOne({ where: { nameid: comment.owner } })
    if (!owner) throw new Error('[UnlikeComment] - No owner found')

    owner.likes -= 1

    await User.save(owner)
    return await Comment.save(comment)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg('commentid') commentid: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const comment = await Comment.findOne({ where: { commentid } })
    const user = await User.findOne({ where: { userid: req.session.userid } })

    if (!comment || !user)
      throw new Error('[DeleteComment] - no post or user found')
    else if (comment.owner !== user.nameid) return false

    await Comment.remove(comment)
    return true
  }
}
