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
import {
  Config,
  adjectives,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator'
import { isAuth } from '../middleware/isAuth'

// email

@InputType()
class UpdateUser {
  @Field({ nullable: true })
  displayName!: string

  @Field({ nullable: true })
  pfp?: string

  @Field({ nullable: true })
  password?: string
}

@InputType()
class Login {
  @Field()
  username!: string

  @Field()
  password!: string
}

@InputType()
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
    return await User.find()
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
    if (params.username.length < 2)
      throw new Error('Username must be at least 2 characters')
    if (params.password.length < 4)
      throw new Error('Password must be at least 4 characters')

    const usernameTaken = await User.findOne({
      where: { username: params.username },
    })

    if (usernameTaken) throw new Error('Username already taken')

    const nameTaken = await User.findOne({
      where: { displayName: params.displayName },
    })

    if (nameTaken) throw new Error('Already taken')

    const config: Config = {
      dictionaries: [adjectives, colors],
      length: 1,
    }

    const randomName = uniqueNamesGenerator(config)

    const failedGeneration = await User.findOne({
      where: { displayName: randomName },
    })

    if (failedGeneration)
      throw new Error('Generation of a random name has failed')

    const def =
      'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'

    const hashedPassword = await hash(params.password, await genSalt(10))

    const user: User = await User.create({
      username: params.username.toLowerCase(),
      password: hashedPassword,
      displayName: randomName,
      status: true,
      pfp: def,
    }).save()

    req.session.displayName = user.displayName

    return user
  }

  @Mutation(() => User)
  async login(
    @Arg('params') params: Login,
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

    req.session.displayName = user.displayName

    user.status = true

    if (!user.pfp)
      user.pfp =
        'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'

    return await User.save(user)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { req }: MyContext): Promise<boolean> {
    const user = await User.findOne({
      where: { displayName: req.session.displayName },
    })

    if (!user) throw new Error('User not found')

    user.status = false

    await User.save(user)

    req.session.destroy(err => (err ? err : true))

    return true
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateUser(
    @Arg('params') params: UpdateUser,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await User.findOne({
      where: { displayName: req.session.displayName },
    })

    !params.displayName
      ? (user.displayName = params.displayName)
      : !params.pfp
      ? (user.pfp = params.pfp)
      : !params.password
      ? (user.password = params.password)
      : new Error('Please make some changes then hit "Save".')

    return await User.save(user)
  }

  // delete button !! no need mutation
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async deleteUser(@Ctx() { req }: MyContext): Promise<boolean> {
    const user = await User.findOne({
      where: { displayName: req.session.displayName },
    })

    await user.remove()

    return true
  }
}
