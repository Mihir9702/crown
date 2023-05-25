import express from 'express'
import { COOKIE, PORT, __prod__ } from './consts'
import db from './conn'
import cors from 'cors'
import session from 'express-session'
import { buildSchema } from 'type-graphql'
import logger from 'morgan'
import cookieParser from 'cookie-parser'

import { createYoga } from 'graphql-yoga'
import { UserResolver } from './resolvers/user'
import { PostResolver } from './resolvers/post'
import { MyContext } from './types'

const main = async () => {
  await db.initialize().then(() => {
    console.log('Database Initialized')
  })
  await db.runMigrations()

  const app = express()

  app.use(logger('dev'))
  app.use(cookieParser())

  // might have to set to 1
  app.set('trust proxy', 1)
  app.use(
    cors({
      origin: 'http://localhost:3001',
      credentials: true,
    })
  )

  app.use(
    session({
      name: COOKIE,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: !__prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  )

  const schema = await buildSchema({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvers: [UserResolver, PostResolver],
    validate: false,
  })

  const yoga = createYoga({
    schema,
    context: ({ req, res }): MyContext => ({ req, res }),
  })

  app.use('/graphql', yoga)

  app.listen(PORT, () =>
    console.log(`🚀 Server started on http:localhost:${PORT}/graphql`)
  )
}

main()
