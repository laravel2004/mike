import { Html, Head, Main, NextScript } from 'next/document'
import { useTheme } from 'next-themes'

export default function Document() {
  const {theme, setTheme} = useTheme();

  return (
    <Html lang="id">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
