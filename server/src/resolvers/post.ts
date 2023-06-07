import 'dotenv/config'
import * as Upload from 'upload-js-full'
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  UseMiddleware,
} from 'type-graphql'
import { Post } from '../model/Post'
import { Create, Delete, MyContext, Update } from '../types'
import { randomNumber } from '../helpers/rand'
import { isAuth } from '../middleware/isAuth'
import { User } from '../model/User'

@Resolver()
export class PostResolver {
  @Query(() => Post)
  async post(@Arg('postid') postid: number): Promise<Post | null> {
    return await Post.findOne({ where: { postid } })
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return await Post.find()
  }

  @Query(() => [Post])
  async owner(@Arg('owner') owner: string): Promise<Post[]> {
    return await Post.find({ where: { owner } })
  }

  @Query(() => [Post])
  async postSearch(@Arg('header') header: string): Promise<Post[]> {
    return await Post.find({ where: { header } })
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('params') params: Create,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    const user = await User.findOne({ where: { userid: req.session.userid } })
    if (!user) throw new Error('[CreatePost] - No user session')

    const postid = randomNumber(5)

    // upload.io
    const apiKey = process.env.UPLOAD_PRIVATE_KEY
    new Upload.UploadManager(
      new Upload.Configuration({
        fetchApi: fetch,
        apiKey,
      })
    )
      .upload({
        accountId: String(process.env.UPLOAD_ACCOUNT_ID),
        data: 'image upload',
      })
      .then(({ fileUrl }) => {
        console.log('[FILE UPLOAD] - ', fileUrl)
      })
      .catch(x => console.log('[CreatePost] - uploading error', x))

    const post = await Post.create({
      ...params,
      owner: user.nameid,
      pinned: false,
      postid,
    }).save()

    await User.save(user)
    return post
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(@Arg('params') params: Update): Promise<Post> {
    const post = await Post.findOne({
      where: { postid: params.postid },
    })

    if (!post) throw new Error('[UpdatePost] - No post found')

    post.header = params.header

    return await Post.save(post)
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async likePost(
    @Arg('postid') postid: number,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    if (!req.session.userid) throw new Error('[LikePost] - Please log in')

    const post = await Post.findOne({ where: { postid } })
    if (!post) throw new Error('[LikePost] - No post found')

    if (!post.likes) post.likes = [req.session.userid]
    else post.likes.push(req.session.userid)
    console.log('[LikePost] - post.likes', post.likes)

    const owner = await User.findOne({ where: { nameid: post.owner } })
    if (!owner) throw new Error('[LikePost] - No user found')

    owner.likes += 1

    await User.save(owner)
    return await Post.save(post)
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async unlikePost(
    @Arg('postid') postid: number,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    const post = await Post.findOne({ where: { postid } })
    if (!post) throw new Error('[UnlikePost] - No post found')

    if (!req.session.userid) throw new Error('[UnlikePost] - Please log in')
    const idx = post.likes?.indexOf(req.session.userid)

    if (idx) {
      post.likes?.splice(idx, 1)
    }

    const owner = await User.findOne({ where: { nameid: post.owner } })
    if (!owner) throw new Error('[UnlikePost] - No owner found')

    owner.likes -= 1

    await User.save(owner)
    return await Post.save(post)
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg('params') params: Delete,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const post = await Post.findOne({ where: { postid: params.postid } })
    const user = await User.findOne({ where: { userid: req.session.userid } })

    if (!post || !user) throw new Error('[DeletePost] - no post or user found')
    else if (post.owner !== user.nameid) return false

    await Post.remove(post)
    return true
  }
}
