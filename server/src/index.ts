import express from 'express'
import { COOKIE, PORT, __prod__ } from './consts'
import db from './conn'
import cors from 'cors'
import session from 'express-session'
import { buildSchema } from 'type-graphql'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import { UserResolver } from './resolvers/user'
import { PostResolver } from './resolvers/post'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { MyContext } from './types'

const main = async () => {
  await db.initialize()
  await db.runMigrations()

  const app = express()

  app.use(logger('dev'))
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // might have to set to 1
  app.set('trust proxy', 1)
  app.use(
    cors({
      // frontend url
      origin: `http://localhost:3001`,
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

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
      validate: false,
    }),
  })

  await apolloServer.start()

  app.use(
    '/graphql',
    // cors<cors.CorsRequest>(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<MyContext> => ({ req, res }),
    })
  )

  app.listen(PORT, () =>
    console.log(`🚀 Server started on http:localhost:${PORT}/graphql`)
  )
}

main()
