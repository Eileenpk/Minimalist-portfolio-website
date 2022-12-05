import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Portfoliostyles from '../styles/Portfolio.module.css'
import Header from "./Header";
import Footer from "./Footer"
import ContactMeSection from "./ContactMeSection";
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
        projects {
          title
          slug
          textDescription
          projectBackgroundText
          introPhotoMobile{
            url
          }
          introPhotoTablet{
            url
          }
          introPhotoFullWebsite{
            url
          }
        }
      }
      `
      const data = await graphQLClient.request(query)
      const projects = data.projects
      
      return {
        props: {
            projects
        }
      }
  }

export default function Portfolio({ projects }) {
    const { width } = useWindowSize()
    console.log(projects) 
    const projectMap = projects.map(project => {
        return (
            <section className={Portfoliostyles.section}>
            <div>
            { width < 650 ?
                <Image 
                    src={project.introPhotoMobile.url}
                    className={styles.image}
                    alt="hero"
                    width={311}
                    height={288}
                />
               : width <1200 ?
               <Image 
                    src={project.introPhotoTablet.url}
                    className={styles.image}
                    alt="hero"
                    width={339}
                    height={314}
                />
                : 
                <Image 
                    src={project.introPhotoFullWebsite.url}
                    className={styles.image}
                    alt="hero"
                    width={540}
                    height={500}
                />
            }
            </div>
            
            <div className={Portfoliostyles.projectInfoText}>
                <h1 className={styles.title}>{project.title}</h1>
                <p className={`${styles.pText} ${Portfoliostyles.projectText}`}>{project.textDescription}</p>
                <div className={styles.btn}>
                    <a href="#portfolio">VIEW PROJECT</a>
                </div>
            </div>
            </section>

        )
    })
    return (
        <div className={styles.container}>
            <Header className={`${styles.header} ${Portfoliostyles.portfolioHeader}`}/>
            <main className={styles.main}>
                <div className={Portfoliostyles.projectSectionsContainer}>{projectMap}</div>
                <ContactMeSection />
            </main>
            <Footer className={styles.footer}/>
        </div>
        
    )
}