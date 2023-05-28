/* eslint-disable @typescript-eslint/no-unused-vars */
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
import axios from 'axios'

@Resolver()
export class PostResolver {
  @Query(() => Post)
  async post(@Arg('postid') postid: number): Promise<Post> {
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

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('params') params: Create,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    const apiKey = process.env.UPLOAD_PRIVATE_KEY
    const accountId = process.env.UPLOAD_ACCOUNT_ID

    const user = await User.findOne({
      where: { userid: req.session.userid },
    })
    console.log('[POST OWNER] - ', user.nameid)

    const postid = randomNumber(4)

    new Upload.UploadManager(
      new Upload.Configuration({
        fetchApi: axios,
        apiKey,
      })
    )
      .upload({
        accountId,
        data: 'image upload', //fileurl
      })
      .then(({ fileUrl, filePath }) => {
        console.log('[FILE UPLOAD] - ', fileUrl)
      })
      .catch(x => console.log(x))

    // ! this doesn't work
    const likes = [user.userid]

    const post = await Post.create({
      ...params,
      owner: user.nameid,
      likes,
      pinned: false,
      postid,
    }).save()

    // ? does this work
    user.posts !== undefined
      ? (user.posts = [...user.posts, post])
      : (user.posts = [post])
    await User.save(user)

    // user.posts

    return post
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(@Arg('params') params: Update): Promise<Post> {
    const post = await Post.findOne({
      where: { postid: params.postid },
    })

    post.header = params.header

    return await Post.save(post)
  }

  // ! this doesn't work
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async likePost(
    @Arg('postid') postid: number,
    @Arg('userid') userid: number
  ): Promise<Post> {
    const post = await Post.findOne({ where: { postid } })
    const user = await User.findOne({ where: { userid } })

    const users = post.likes.map(p => p.toString())

    if (users.includes(String(userid))) {
      const newusers = users.filter(id => id !== String(userid))
      console.log(newusers)
      const numusers = newusers.map(u => Number(u))
      post.likes = numusers
      await Post.save(post)
    } else {
      const newusers = ['00000', String(userid)]
      console.log(newusers)
      post.likes = newusers.map(u => Number(u))
      await Post.save(post)
    }

    return post
  }

  // ! this doesn't work
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg('params') params: Delete
    // @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const post = await Post.findOne({
      where: { postid: params.postid },
    })

    if (post.owner !== params.nameid) return false

    // ? does this work
    // const user = await User.findOne({ where: { userid: req.session.userid }})
    // user.likes -= post.likes.length
    // await User.save(user)

    await Post.remove(post)

    return true
  }
}
