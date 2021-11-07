import React, { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "modern-css-reset/dist/reset.min.css";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Layout from "../src/components/layout";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/koikoi192.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RecoilRoot>
          {router.asPath === "/" ? (
            <Component {...pageProps} key={router.asPath} />
          ) : (
            <Layout>
              <Component {...pageProps} key={router.asPath} />
            </Layout>
          )}
        </RecoilRoot>
      </ThemeProvider>
    </React.Fragment>
  );
}
export default MyApp;
