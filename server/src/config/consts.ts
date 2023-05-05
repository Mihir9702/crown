import 'dotenv/config'

export const MONGO_URI = process.env.MONGOURI || process.env.MONGO_LOCAL

export const PORT = process.env.port || 3000
