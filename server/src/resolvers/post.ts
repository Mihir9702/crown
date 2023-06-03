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
import { randomNumber } from '../helpers'
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
    return await Post.find({ order: { createdAt: -1 } })
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
    const apiKey = process.env.UPLOAD_PRIVATE_KEY

    const user = await User.findOne({ where: { userid: req.session.userid } })
    if (!user) throw new Error('[CreatePost] - No user session')

    const postid = randomNumber(4)

    // upload.io
    new Upload.UploadManager(
      new Upload.Configuration({
        fetchApi: fetch,
        apiKey,
      })
    )
      .upload({
        accountId: String(process.env.UPLOAD_ACCOUNT_ID),
        data: 'image upload', //fileurl
      })
      .then(({ fileUrl, filePath }) => {
        console.log('[FILE UPLOAD] - ', fileUrl)
      })
      .catch(x => console.log(x))

    const post = await Post.create({
      ...params,
      owner: user.nameid,
      pinned: false,
      postid,
    }).save()

    // user.posts
    if (!user.posts) user.posts = [post]
    else user.posts.push(post)

    return post
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(@Arg('params') params: Update): Promise<Post> {
    const post = await Post.findOne({
      where: { postid: params.postid },
    })

    if (!post) throw new Error('No post found')

    post.header = params.header

    return await Post.save(post)
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async likePost(
    @Arg('postid') postid: number,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    const post = await Post.findOne({ where: { postid } })
    if (!post) throw new Error('[LikePost] - No post found')

    if (!req.session.userid) throw new Error('[LikePost] - Please log in')

    if (!post.likes) post.likes = [req.session.userid]
    else post.likes.push(req.session.userid)

    const user = await User.findOne({ where: { nameid: post.owner } })
    if (!user) throw new Error('No user found')

    user.likes += 1

    await User.save(user)
    return await Post.save(post)
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async unlikePost(
    @Arg('postid') postid: number,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    const post = await Post.findOne({ where: { postid } })
    if (!post) throw new Error('No post found')

    if (!req.session.userid) throw new Error('[UnlikePost] - Please log in')
    const idx = post.likes?.indexOf(req.session.userid)

    if (idx) {
      post.likes?.splice(idx, 1)
    }

    const user = await User.findOne({ where: { nameid: post.owner } })
    if (!user) throw new Error('No user found')

    user.likes -= 1

    await User.save(user)
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

    if (!post || !user) throw new Error('no post or user found')
    else if (post.owner !== user.nameid) return false

    await Post.remove(post)
    return true
  }
}
