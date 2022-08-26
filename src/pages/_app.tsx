import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from 'src/components/Layout'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Cozyband 개발블로그</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
