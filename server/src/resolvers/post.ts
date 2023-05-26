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
  async post(@Arg('postid') postid: number): Promise<Post> {
    // pull from upload.io
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

    const { header, content } = params
    const postid = randomNumber(4)

    new Upload.UploadManager(
      new Upload.Configuration({
        fetchApi: fetch,
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

    const likes = [user.userid]

    const post = await Post.create({
      header,
      content,
      owner: user.nameid,
      likes,
      pinned: false,
      postid,
    }).save()

    console.log(post)
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

  // @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async likePost(
    @Arg('postid') postid: number,
    @Arg('userid') userid: number
  ): Promise<Post> {
    const post = await Post.findOne({ where: { postid } })
    const user = await User.findOne({ where: { userid } })

    post.likes.push(userid)

    await Post.save(post)
    return post
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg('params') params: Delete,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const post = await Post.findOne({
      where: { postid: params.postid },
    })

    if (post.owner !== params.nameid) return false

    const user = await User.findOne({
      where: { userid: req.session.userid },
    })

    user.likes -= post.likes.length

    await User.save(user)
    await Post.remove(post)

    return true
  }
}
