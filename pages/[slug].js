import Head from "next/head";
import Image from "next/image";
import Link from 'next/link'
import styles from "../styles/Home.module.css";
import Portfoliostyles from '../styles/Portfolio.module.css'
import projectPage from '../styles/ProjectPage.module.css'
import Header from "./Header";
import Footer from "./Footer"
import ContactMeSection from "./ContactMeSection";
import { gql, GraphQLClient } from 'graphql-request'
import useWindowSize from "./utils/useWindowSize";

  export const getServerSideProps = async (pageContext) => {
    const url = process.env.ENDPOINT
    const graphQLClient = new GraphQLClient(url, {
        headers: {
            "Authorization" : process.env.GRAPH_CMS_TOKEN
        }
    })
    const Slug = pageContext.query.slug
 
    const query = gql`
    
    query($Slug: String!){
        projectsArray: projects{
            slug
            title
          }
      
        projects(where: {
              slug: $Slug
            })  {
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
          heroPhotoFullWebsite {
            url
          }
          heroPhotoTablet{
            url
          }
          heroPhotoMobile{
            url
          }
          firstStaticPreviewPhotoFullWebsite{
            url
          }
          firstStaticPreviewPhotoTablet{
            url
          }
          firstStaticPreviewPhotoMobile{
            url
          }
          secondStaticPreviewPhotoFullWebsite{
            url
          }
          secondStaticPreviewPhotoTablet{
            url
          }
          secondStaticPreviewPhotoMobile{
            url
          }
        }
      }

      `

      const variables = {
        Slug,
    }
      const data = await graphQLClient.request(query, variables)
      const projects = data.projects
      const projectsArray = data.projectsArray
      return {
        props: {
            projects,
            projectsArray
        }
      }
  }
  
  export default function page({projects, projectsArray}) {
    const {width} = useWindowSize()
    const projectMap = projects.map((project) => {

        const currentSlug = projects[0].slug
        const slugsArray = projectsArray.map(item => item.slug)

        const findPrevProject = slugsArray.map((slug, i) => {
            if(currentSlug === slug) {
                let newIndex = i - 1
                if(newIndex < 0) {
                    newIndex = slugsArray.length -1
                }
                return slugsArray[newIndex]
            } else return
        })

        const findNextProject = slugsArray.map((slug, i) => {
            if(currentSlug === slug) {
                let newIndex = i + 1
                if(newIndex > slugsArray.length -1) {
                    newIndex = 0
                }
                return slugsArray[newIndex]
            } else return
        })

        return (
            <section className={Portfoliostyles.section} key={project.slug}>
                <div>
                    {   width < 650 ?
                        <Image 
                            src={project.heroPhotoMobile.url}
                            className={styles.image}
                            alt={`${project} hero photo`}
                            width={311}
                            height={140}
                        />
                        : width <1200 ?
                        <Image 
                            src={project.heroPhotoTablet.url}
                            className={styles.image}
                            alt={`${project} hero photo`}
                            width={689}
                            height={310}
                        />
                        : 
                        <Image 
                            src={project.heroPhotoFullWebsite.url}
                            className={styles.image}
                            alt={`${project} hero photo`}
                            width={1110}
                            height={500}
                        />
                    }
                </div>
                
                <div className={Portfoliostyles.projectInfoText}>
                    <h1 className={styles.title}>{project.title}</h1>
                    <p className={`${styles.pText} ${Portfoliostyles.projectText}`}>{project.textDescription}</p>
                    <span className={projectPage.span}>Interaction Design / Front End Development <br />HTML / CSS / JS </span>
                    <div className={styles.btn}>
                        <Link href={`/${projects.slug}`}>VIEW WEBSITE</Link>
                    </div>
                </div>

                <div className={projectPage.projectBackgroundContainer}>
                    <h2 className={styles.subTitle}>Project Background</h2>
                    <p className={styles.pText}>
                        {project.projectBackgroundText}
                    </p>
                    <h3 className={styles.subTitle}>Static Previews</h3>
                    {   width < 650 ?
                        <div>
                            <Image 
                                src={project.firstStaticPreviewPhotoMobile.url}
                                className={`${styles.image} ${projectPage.staticPhoto}`}
                                alt={`${project} first static photo`}
                                width={311}
                                height={140}
                            />

                            <Image 
                                src={project.secondStaticPreviewPhotoMobile.url}
                                className={`${styles.image} ${projectPage.staticPhoto}`}
                                alt={`${project} second static photo`}
                                width={311}
                                height={140}
                            />
                        </div>
                        : width <1200 ?
                        <div>
                            <Image 
                                src={project.firstStaticPreviewPhotoTablet.url}
                                className={`${styles.image} ${projectPage.staticPhoto}`}
                                alt={`${project} first static photo`}
                                width={689}
                                height={434}
                            />

                            <Image 
                                src={project.secondStaticPreviewPhotoTablet.url}
                                className={`${styles.image} ${projectPage.staticPhoto}`}
                                alt={`${project} second static photo`}
                                width={689}
                                height={434}
                            />
                        </div>
                        : 
                        <div>
                            <Image 
                                src={project.firstStaticPreviewPhotoFullWebsite.url}
                                className={`${styles.image} ${projectPage.staticPhoto}`}
                                alt={`${project} first static photo`}
                                width={635}
                                height={400}
                            />

                            <Image 
                                src={project.secondStaticPreviewPhotoFullWebsite.url}
                                className={`${styles.image} ${projectPage.staticPhoto}`}
                                alt={`${project} second static photo`}
                                width={635}
                                height={400}
                            />
                        </div>
                    }
                </div>
                <div className={projectPage.goToNextOrPrevProjectContainer}>
                    <div className={projectPage.prevProject} >
                    <Link href={`/${findPrevProject.join('')}`}>  
                        <Image 
                            src='/images/arrow-left.svg'
                            className={styles.icon}
                            alt="left arrow"
                            width={8}
                            height={16}
                        />
                    </Link>
                        <h4 className={styles.scrollProjectTitle} >{findPrevProject}</h4>
                        <p>Previous Project</p>
                    </div>
                    <div className={projectPage.nextProject}>
                        <Link href={`/${findNextProject.join('')}`}>  
                            <Image 
                                src='/images/arrow-right.svg'
                                className={styles.icon}
                                alt="right arrow"
                                width={8}
                                height={16}
                            />
                        </Link>
                        <h4 className={styles.scrollProjectTitle}>{findNextProject}</h4>
                        <p>Next Project</p>
                    </div>
                </div>
            </section>

        )
    })
    return (
        <div className={styles.container}>
            <Head>
                <title>Portfolio designs at beautiful prices</title>
                <meta name="description" content="Come see beautiful and useable design examples to help you get your message to the world." />
                <meta property="og:title" content="When less gives you more- Minimalist Portfolio" />
                <meta
                property="og:description"
                content="In a world where we are bombarded with ads and visual clutter the minimalist portfolio lets your customers know who you really are."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header className={`${styles.header} ${Portfoliostyles.portfolioHeader}`}/>
            <main className={styles.main}>
                <div className={Portfoliostyles.projectSectionsContainer}>{projectMap}</div>
                <ContactMeSection />
            </main>
            <Footer className={styles.footer}/>
        </div>
        
    )
}
  