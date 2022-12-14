import '../styles/globals.css'
import Header from './Header'
import Footer from './Footer'


export default function MyApp({ Component, pageProps }) {
  return (
    <main className='container flex flex-col items-center justify-center min-w-full p-0 px-8 m-0 mx-auto text-base bg-main-color font-text text-font-color md:text-base'>
      <Header />
      <Component {...pageProps} />
      <Footer className='footer' />
    </main>
  )
}
