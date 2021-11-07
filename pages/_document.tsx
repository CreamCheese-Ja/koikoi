import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import theme from "../src/theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://koikoi-community" />
          <meta property="og:image" content="/koikoiOgpImage.png" />
          <meta property="og:title" content="恋々 | 恋愛相談SNS" />
          <meta
            property="og:description"
            content="誰でも気軽に利用できる恋愛相談SNS。誰もが抱える恋愛の悩みや不安、それらを気軽に共有し自分の恋を成就させよう。"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
