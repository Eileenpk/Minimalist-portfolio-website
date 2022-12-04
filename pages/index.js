import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./Header";
import Footer from "./Footer"
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Minimalist portfolio website beautiful design at a beautiful price</title>
        <meta name="description" content="Come see how we create beautiful and useable design to help you get your message to the world." />
        <meta property="og:title" content="When less gives you more- Minimalist Portfolio" />
        <meta
          property="og:description"
          content="In a world where we are bombarded with ads and visual clutter the minimalist portfolio lets your customers know who you really are."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className={styles.header} />
      <main className={styles.main}>
        <h1 className={styles.title}>
          test
        </h1>

        
      </main>

      <Footer className={styles.footer}/>
    </div>
  );
}
