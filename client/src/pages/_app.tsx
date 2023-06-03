import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import client from '@/client'
import { Provider } from 'urql'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}
