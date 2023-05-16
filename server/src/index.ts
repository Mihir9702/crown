import 'reflect-metadata'
import express from 'express'
import { COOKIE, PORT, __prod__ } from './config/consts'
import db from './config'
import cors from 'cors'
import session from 'express-session'
import { buildSchema } from 'type-graphql'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { json } from 'body-parser'

const main = async () => {
  await db.initialize()
  await db.runMigrations()

  const app = express()

  app.use(logger('dev'))
  app.use(cookieParser())

  // might have to set to 1
  app.set('trust proxy', __prod__)
  app.use(
    cors({
      origin: 'http://localhost:8080',
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
      secret:
        (process.env.SESSION_SECRET as string) || 'akwljdlkawmdlkawjdoiajkl',
      resave: false,
    })
  )

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/*.ts'],
      validate: false,
    }),
  })

  app.use(
    '/graphql',
    cors<cors.CorsRequest>,
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  )

  app.listen(PORT, () =>
    console.log('🚀 Server started on http://localhost:3000')
  )
}

main()
