import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import Layout from '../components/_layout'

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <Layout>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </Layout>
  );
}
