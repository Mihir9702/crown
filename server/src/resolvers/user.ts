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
import { hash, genSalt, compare } from 'bcrypt'
import {
  Config,
  adjectives,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator'
import { isAuth } from '../middleware/isAuth'

@InputType()
class Login {
  @Field()
  name!: string

  @Field()
  password!: string
}

class Signup {
  @Field()
  username!: string

  @Field()
  password!: string

  @Field()
  displayName!: string
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find()
  }

  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.displayName) {
      return null
    }

    const user = await User.findOne({
      where: { displayName: req.session.displayName },
    })
    return user
  }

  @Mutation(() => User)
  async signup(
    @Arg('params') params: Signup,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const unoriginal = await User.findOne({
      where: { username: params.username },
    })

    const config: Config = {
      dictionaries: [adjectives, colors],
      length: 1,
    }

    const randomName = uniqueNamesGenerator(config)

    const name = await User.findOne({
      where: { displayName: params.displayName },
    })

    const disappointed = await User.findOne({
      where: { displayName: randomName },
    })

    if (unoriginal) throw new Error('Username already taken')
    if (disappointed) throw new Error('disappointed already')
    if (name) throw new Error('Already taken')
    if (params.username.length < 2)
      throw new Error('Username must be at least 2 characters')
    if (params.password.length < 4)
      throw new Error('Password must be at least 4 characters')

    const hashedPassword = await hash(params.password, await genSalt(10))

    const user = await User.create({
      username: params.username.toLowerCase(),
      password: hashedPassword,
      displayName: randomName,
      status: true,
    }).save()

    req.session.displayName = user.displayName

    return user
  }

  @Mutation(() => User)
  async login(
    @Arg('params') params: Login,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!params.name) throw new Error('Username not provided')
    if (!params.password) throw new Error('Password not provided')

    const user = await User.findOne({
      where: { username: params.name } || { displayName: params.name },
    })

    if (!user) throw new Error('User not found')

    const valid = await compare(params.password, user.password)

    if (!valid) throw new Error('Invalid username or password')

    req.session.displayName = user.displayName

    return user
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { req }: MyContext): Promise<boolean> {
    req.session.destroy(err => (err ? err : true))

    return true
  }
}
