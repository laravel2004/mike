import '@/styles/globals.css'
import { Context } from '@/service/context/Context'
import { Montserrat } from 'next/font/google'
import {initializeSocket} from "@/service/socket/client";
import {AppwriteProvider} from "@/service/context/AppwriteContext";
import {initializeClient} from "@/service/appwrite";
import { ThemeProvider } from 'next-themes';
import 'regenerator-runtime/runtime'

const montserrat = Montserrat({ subsets: ['latin'] })

let client = initializeClient()

export default function App({ Component, pageProps }) {
  let socket = initializeSocket()
  return(
    <Context>
        <AppwriteProvider client={client}>
          <ThemeProvider attribute="data-theme">
            <main className={montserrat.className}>
                <Component {...pageProps} socket={socket}/>
            </main>
            </ThemeProvider>
        </AppwriteProvider>
    </Context>
  ) 
}
