import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from 'src/components/Layout'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>JoJee Blog</title>
        <meta name="keywords" content="jojee, blog" />
        <meta name="author" content="JoJee" />
        <meta name="description" content="개발자 JoJee의 블로그입니다" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
