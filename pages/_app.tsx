import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import Head from 'next/head';

export default function App({Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>NLOG</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>
}
