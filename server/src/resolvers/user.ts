import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { hash, genSalt, compare } from 'bcryptjs'
import { isAuth } from '../middleware/isAuth'
import { User } from '../model/User'
import { Post } from '../model/Post'
import { randomName, randomNumber } from '../helpers/rand'
import { validate, validatePassword } from '../helpers/validate'
import { Input, MyContext, UpdatePass, UpdateUser } from '../types'
import { COOKIE } from '../consts'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find({ order: { createdAt: -1 } })
  }

  @Query(() => User)
  async userSearch(@Arg('nameid') nameid: string): Promise<User | null> {
    return await User.findOne({ where: { nameid } })
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async user(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.id) return null

    console.log('[User] - ', req.session.userid)
    return await User.findOne({ where: { userid: req.session.userid } })
  }

  @Mutation(() => User)
  async signup(
    @Arg('params') params: Input,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!validate(params)) console.log('[Signup] - attempt failed validation')

    const usernameTaken = await User.findOne({
      where: { username: params.username },
    })

    if (usernameTaken) throw new Error('[Signup] - username already taken')

    const { username } = params
    const password = await hash(params.password, await genSalt(10))
    const nameid = params.nameid || randomName()
    const photoid = process.env.DEFAULT_IMG
    const userid = randomNumber(4)
    const bio = params.bio || ''

    const userCreation = { username, password, nameid, photoid, userid, bio }

    const user = await User.create(userCreation).save()

    if (!user) console.log('[Signup] - error creating user')

    req.session.userid = user.userid
    console.log('[Signup] - created user', req.session.userid)

    return user
  }

  @Mutation(() => User)
  async login(
    @Arg('params') params: Input,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!validate(params)) console.log('[Login] - Invalid username or password')

    const user =
      (await User.findOne({ where: { username: params.username } })) ||
      (await User.findOne({ where: { nameid: params.nameid } }))
    if (!user) throw new Error('[Login] - User not found')

    const valid = await compare(params.password, user.password)
    if (!valid) throw new Error('[Login] - Invalid username or password')

    req.session.userid = user.userid
    console.log('[Login] - user session id', req.session.userid)

    return user
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateUser(
    @Arg('params') params: UpdateUser,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await User.findOne({ where: { userid: req.session.userid } })
    if (!user) throw new Error('[UpdateUser] - no user')

    if (params && params.nameid) {
      const posts = await Post.find({ where: { owner: user.nameid } })
      posts.forEach(async post => {
        post.owner = params.nameid!
        await Post.save(post)
      })
    }

    user.nameid = params.nameid ? params.nameid : user.nameid
    user.photoid = params.photoid ? params.photoid : user.photoid
    user.bio = params.bio ? params.bio : user.bio

    return await User.save(user)
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updatePass(
    @Arg('params') params: UpdatePass,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await User.findOne({ where: { userid: req.session.userid } })
    if (!user) throw new Error('[UpdatePass] - no user')

    const valid = await compare(params.currPass, user.password)
    if (!valid) throw new Error('[UpdatePass] - invalid password')

    validatePassword(params.newPass)

    const password = await hash(params.newPass, await genSalt(10))

    user.password = password
    return await User.save(user)
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    console.log('[Logout] - ', req.session.userid)

    res.clearCookie(COOKIE)
    return new Promise(re =>
      req.session.destroy(err => {
        if (err) {
          re(false)
          return
        }

        re(true)
      })
    )
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(@Ctx() { req }: MyContext): Promise<boolean> {
    await User.remove(
      //  @ts-ignore
      await User.findOne({ where: { userid: req.session.userid } })
    )
    return true
  }
}
