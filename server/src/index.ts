import express, { Express } from 'express'
import { Mongoose } from './config'
import { PORT } from './config/consts'

const app: Express = express()

import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

app.set('trust proxy', 1)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
)

Mongoose()

// routes

const connect = () => {
  console.log(`You are now connected to http://localhost:${PORT}`)
}

app.listen(PORT, () => connect())
