import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/_layout";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ThirdwebProvider desiredChainId={ChainId.BinanceSmartChainTestnet}>
      <Layout>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Component {...pageProps} />
        </MantineProvider>
      </Layout>
    </ThirdwebProvider>
  );
}
