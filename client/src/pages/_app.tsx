import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import client from '@/client'
import { Provider } from 'urql'
import { Uploader } from 'uploader'

export const uploader = Uploader({
  apiKey: process.env.NEXT_PUBLIC_UPLOAD_KEY as string,
})
export const uploaderOptions = {
  multi: false,
  styles: {
    colors: {
      primary: '#2563eb',
      active: '#1d4ed8',
    },
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}
