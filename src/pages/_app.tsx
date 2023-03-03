import { AppProvider } from '@/context'
import '@/styles/globals.css'
import { trpc } from '@/utils/trpc'
import { SessionProvider } from 'next-auth/react'
import type { AppProps, AppType } from 'next/app'

const App: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
