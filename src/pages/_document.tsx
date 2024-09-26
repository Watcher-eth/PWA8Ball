import { Html, Head, Main, NextScript } from "next/document"
import { APP_DESCRIPTION, APP_NAME } from "@/constants"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#FFFFFF" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/AppIcon512.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/OrbLogo.png" />
        <script src="https://js.stripe.com/v3/"></script>
        <script src="https://crypto-js.stripe.com/crypto-onramp-outer.js"></script>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
