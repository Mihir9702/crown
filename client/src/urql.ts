import { cacheExchange, Client, fetchExchange } from 'urql'

const client = new Client({
  url: 'http://localhost:3000/graphql',
  exchanges: [cacheExchange, fetchExchange],
})

export default client
