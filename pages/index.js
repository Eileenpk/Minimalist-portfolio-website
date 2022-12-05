import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./Header";
import Footer from "./Footer"
import { gql, GraphQLClient } from 'graphql-request'
import useWindowSize from "./utils/useWindowSize";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      'Authorization' : process.env.GRAPH_CMS_TOKEN
    }
  })
  const query = gql`
    query{
      sections {
        title
        slug
        heroPhotoMobile {
          url
        }
        heroPhotoTablet {
          url
        }
        heroPhotoFullWebsite {
          url
        }
        tagLine
        descriptionText
        secondPhotoMobile {
          url
        }
        secondPhotoTablet {
          url
        }
        secondPhotoFullWebsite {
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
  const { width } = useWindowSize();
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
        <section className={styles.aboutMe}>
      { width < 600 ?
        <Image 
          src={sections[0].heroPhotoMobile.url}
          className={styles.image}
          alt="hero"
          width={400}
          height={400}
        />
        : width < 1000 ?
        <Image 
          src={sections[0].heroPhotoTablet.url}
          className={styles.image}
          alt="hero"
          width={688}
          height={600}
        />
        :
        <Image 
          src={sections[0].heroPhotoFullWebsite.url}
          className={styles.image}
          alt="hero"
          width={1110}
          height={600}
        />
        }
            <div className={styles.aboutMeHeroText}>
              <h1 className={styles.title}>
                {sections[0].tagLine}
              </h1>
              <div className={`${styles.btn} ${styles.aboutMeBtn}`}>
                  <div className={styles.btnIconContainer}>
                    <img className={styles.btnIcon} src='../images/down-arrows.svg'/>
                  </div>
                  <a href="#about-me">ABOUT ME</a>
              </div>
            </div>
        </section>
        <section className={styles.aboutMeSection}>
          <div className={styles.avatarContainer}>
            { width < 600 ?
                <Image 
                  src={sections[0].secondPhotoMobile.url}
                  className={styles.image}
                  alt="Avatar"
                  width={311}
                  height={346}
                /> :
                width < 1000 ?
                <Image 
                  src={sections[0].secondPhotoTablet.url}
                  className={styles.avatar}
                  alt="Avatar"
                  width={281}
                  height={600}
                />    
                :
                <Image 
                  src={sections[0].secondPhotoFullWebsite.url}
                  className={styles.image}
                  alt="Avatar"
                  width={540}
                  height={600}
                />        
              }
          </div>
          <div className={styles.aboutMeText}>
            <h1>{sections[0].title}</h1>
            <p>{sections[0].descriptionText}</p>
            <div className={styles.btn}>
              <a href="#Portfolio">GO TO PORTFOLIO</a>
            </div>
          </div>
        </section>
        
        <section className={styles.contactMe}>
          <h1>Interested in doing a project together?</h1>
          <div className={styles.hrLine}></div>
          <div className={`${styles.btn} ${styles.contactMeBtn}`}>
            <a href="#Portfolio">CONTACT ME</a>
          </div>
        </section>

        
      </main>

      <Footer className={styles.footer}/>
    </div>
  );
}
