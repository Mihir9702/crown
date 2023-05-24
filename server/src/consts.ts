import 'dotenv/config'

export const __prod__ = process.env.NODE_ENV !== 'production'

export const PORT = process.env.PORT || 3000

export const COOKIE = 'wrk'
