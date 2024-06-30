import { OG_API_SPLASH_URL } from "@/utils/urls";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:image" content={OG_API_SPLASH_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
