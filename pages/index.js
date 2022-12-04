import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./Header";
import Footer from "./Footer"
import { gql, GraphQLClient } from 'graphql-request'

export const getStaticProps = async () => {
  const url = 'https://us-east-1.cdn.hygraph.com/content/clb6wn52x0dl201uk6inhagsm/master'
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzAxNjEyMDYsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2xiNnduNTJ4MGRsMjAxdWs2aW5oYWdzbS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOGQ3MzgzOTctODY1Yi00ZDI3LWFjOTQtZTEwNzAzNzIyMzgyIiwianRpIjoiY2xiOWV1eXdnMXZicTAxdGEwY2YzM3Z5dCJ9.2ghOXWxPnfIbd3fLOQKUMEu_gLfQTCOc7Kj2N7GMe1bReOQdCsCDorm_Mw6IqLs1TL1asWhky34Ex7SwsDNDYt3QcXCBlR8TbWS2m7cgg7xKcNpvIj4nYnl5UhOuiheGibWsYI6NjlzndG8lifEFQej-4ouJtJ0-kpFFgyNblZ2g-NO8iHYxX17BVyudUIGuGfKEPKyNsrJCmGWFbwGolaqf-6s9lgdpLVzp4uB9aZ7Sglrgzldb6ahHKnurjAw2qng_qQDTvsZp4158nuz_oXrI7HvmqE3m33aUK1cR4BkZbXlcQB2CnzYhV3rBS892m7ylApQ04o6iAZDTa-FLcV2TqWtkcaY8HaFwMKGJPS5WdmGIwZ3pL6pLv87aiHssjLxy7kOilMGR2p1cZVKcYO3dJoh9q5o3FBE8Qdywoc687Ef8fPEqEKPjJuiS6AGMKu4Fqfr3QtCW6dDmXUxAlA2tkMXKjuVdrMtE_ooCfUgR59R90FnDhAnvlX5Eb7gpWB2oVVtDQZnfI5qUMVubySL9uCJAAjmN3cB1n7kbBadVTeqmBYlOaZVJfLQ5MdDFVHNYubfUHZKf6A3PBYszHSOWXYQcsNcGI5Nen7UZXfCAKm_IEVRQHDzOwd7kqPYazxjOz472cDqPd9AeN4050GhFS-IZkD9es44CFSfY1qw'
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
