import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./Header";
import Footer from "./Footer"
import { gql, GraphQLClient } from 'graphql-request'

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      'Authorization' : process.env.GRAPH_CMS_TOKEN
    }
  })
  const query = gql`
    query{
      sections{
      title
      slug
      heroPhoto {
        id
        url
      }
      tagLine
      description {
        html
      }
      secondPhoto {
        id
        url
      }
      }
    }
    `
    const data = await graphQLClient.request(query)
    const sections = data.sections
    
    return {
      props: {
        sections
      }
    }
}


export default function Home({sections}) {
  console.log(sections)
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
        <section className={` ${styles.aboutMe} ${styles.section} `}>
        <Image 
          src={sections[0].heroPhoto.url}
          alt="Logo"
          width={25}
          height={25}
        />
          <img className={`${styles.hero} ${styles.img}`} src={sections[0].heroPhoto.url} />
          <div className={styles.aboutMeInfo}>
            <h1 className={styles.title}>
              {sections[0].tagLine}
            </h1>
            <div className={`${styles.btn} ${styles.aboutMeBtn}`}>
                <div className={styles.btnIconContainer}>
                  <img className={styles.btnIcon} src='../images/down-arrows.svg'/>
                </div>
                <a href="#about-me">ABOUT ME</a>
            </div>
            <img className={`${styles.avatar} ${styles.img}`} src={sections[0].secondPhoto.url} />
          </div>
          
        </section>
      

        
      </main>

      <Footer className={styles.footer}/>
    </div>
  );
}
