import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { User } from '../model/User'
import { Input, MyContext } from '../types'
import { hash, genSalt, compare } from 'bcryptjs'
import { isAuth } from '../middleware/isAuth'
import { randomName, randomNumber } from '../helpers'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find()
  }

  @Query(() => User)
  async user(@Ctx() { req }: MyContext): Promise<User> {
    const user = await User.findOne({
      where: { userid: req.session.userid },
    })
    console.log(user)
    return user
  }

  @Mutation(() => User)
  async signup(
    @Arg('params') params: Input,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const { username } = params
    if (username.length < 2)
      throw new Error('Username must be at least 2 characters')
    if (params.password.length < 4)
      throw new Error('Password must be at least 4 characters')

    const usernameTaken = await User.findOne({
      where: { username: params.username },
    })

    if (usernameTaken) throw new Error('Username already taken')

    const password = await hash(params.password, await genSalt(10))

    const nameid: string = params.nameid || randomName()
    const userid: number = randomNumber(4)

    const user: User = await User.create({
      username,
      password,
      nameid,
      userid,
    }).save()

    req.session.userid = user.userid

    return user
  }

  @Mutation(() => User)
  async login(
    @Arg('params') params: Input,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!params.username) throw new Error('Username not provided')
    if (!params.password) throw new Error('Password not provided')

    const user = await User.findOne({
      where: { username: params.username },
    })

    if (!user) throw new Error('User not found')

    const valid = await compare(params.password, user.password)

    if (!valid) throw new Error('Invalid username or password')

    req.session.userid = user.userid

    return user
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { req }: MyContext): Promise<boolean> {
    const user = await User.findOne({
      where: { userid: req.session.userid },
    })

    if (!user) throw new Error('User not found')

    await User.save(user)

    req.session.destroy(err => (err ? err : true))

    return true
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async deleteUser(@Ctx() { req }: MyContext): Promise<boolean> {
    const user = await User.findOne({
      where: { userid: req.session.userid },
    })

    await User.remove(user)

    return true
  }
}
