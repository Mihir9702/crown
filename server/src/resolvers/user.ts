import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { User } from '../model/User'
import { MyContext } from '../types'
import { hash, genSalt, compare } from 'bcryptjs'
import { isAuth } from '../middleware/isAuth'

@InputType()
class Input {
  @Field()
  username!: string

  @Field()
  password!: string
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find()
  }

  @Query(() => User)
  async user(@Ctx() { req }: MyContext): Promise<User> {
    if (!req.session.id) {
      return null
    }

    const user = await User.findOne({
      where: { username: req.session.username },
    })
    return user
  }

  @Mutation(() => User)
  async signup(
    @Arg('params') params: Input,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (params.username.length < 2)
      throw new Error('Username must be at least 2 characters')
    if (params.password.length < 4)
      throw new Error('Password must be at least 4 characters')

    const usernameTaken = await User.findOne({
      where: { username: params.username },
    })

    if (usernameTaken) throw new Error('Username already taken')

    const hashedPassword = await hash(params.password, await genSalt(10))

    const user: User = await User.create({
      username: params.username,
      password: hashedPassword,
    }).save()

    req.session.username = user.username

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

    req.session.username = user.username

    return await user
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { req }: MyContext): Promise<boolean> {
    const user = await User.findOne({
      where: { username: req.session.username },
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
      where: { username: req.session.username },
    })

    await User.remove(user)

    return true
  }
}
