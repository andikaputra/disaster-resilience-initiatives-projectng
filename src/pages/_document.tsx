import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { ColorSchemeScript } from '@mantine/core';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <Script src="/scripts/signature_matomo.js" strategy="beforeInteractive" /> */}
        <ColorSchemeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
