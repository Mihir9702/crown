import mongoose from 'mongoose'
import { MONGO_URI } from './consts'

export const Mongoose = () => {
  if (MONGO_URI) {
    mongoose
      .connect(MONGO_URI)
      .then(x => {
        console.log(
          `Connected to Mongo! Database name: "${x.connection[0].name}`
        )
      })
      .catch(e => console.error('Error connecting to Mongo', e))
  }
}
