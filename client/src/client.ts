import { cacheExchange, fetchExchange, Client } from 'urql'

export default new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: 'include' as const,
    headers: {
      'x-forwarded-proto': 'https',
    },
  },
})
