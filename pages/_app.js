import '../styles/globals.css'
import Footer from './Footer'
import { PublicSans, IbarraRealNova} from '@next/font/google'

// If loading a variable font, you don't need to specify the font weight
// const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }) {
  return (
    <main className='container min-w-full m-0 p-0 mx-auto bg-main-color px-8 font-text text-font-color text-base flex flex-col justify-center items-center md:text-base'>
      <Component {...pageProps} />
      <Footer className='footer' />
    </main>
  )
}
