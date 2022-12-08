import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Portfoliostyles from "../styles/Portfolio.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ContactMeSection from "./ContactMeSection";
import { gql, GraphQLClient } from "graphql-request";
import useWindowSize from "./utils/useWindowSize";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const query = gql`
    query {
      projects {
        title
        slug
        textDescription
        projectBackgroundText
        introPhotoMobile {
          url
        }
        introPhotoTablet {
          url
        }
        introPhotoFullWebsite {
          url
        }
      }
    }
  `;
  const data = await graphQLClient.request(query);
  const projects = data.projects;

  return {
    props: {
      projects,
    },
  };
};

export default function Portfolio({ projects }) {
  const { width } = useWindowSize();
  const projectMap = projects.map((project) => {
    return (
      <section className='md:flex items-center justify-between md:w-full lg:max-w-[1015px] lg:h-[500px] md:mb-[88px] lg:mb-[80px]' key={project.slug}>
        <div className="max-sm:mb-8 ">
          {width < 650 ? (
            <Image
              src={project.introPhotoMobile.url}
              className="img"
              alt={`${project.title} intro photo`}
              width={311}
              height={288}
              priority
            />
          ) : width < 1200 ? (
            <Image
              src={project.introPhotoTablet.url}
              className="img"
              alt={`${project.title} intro photo`}
              width={339}
              height={314}
              priority
            />
          ) : (
            <Image
              src={project.introPhotoFullWebsite.url}
              className="img"
              alt={`${project.title} intro photo`}
              width={540}
              height={500}
              priority
            />
          )}
        </div>

        <div className="border-t border-t-border-color pt-6 border-b border-b-border-color pb-6 max-sm:mb-[72px] md:w-[281px] lg:h-[500px] lg:flex lg:flex-col lg:justify-center">
          <h1 className="heading mb-6">{project.title}</h1>
          <p className="mb-6">{project.textDescription}</p>
          <div className="btn mb-6">
            <Link href={`/${project.slug}`}>VIEW PROJECT</Link>
          </div>
        </div>
      </section>
    );
  });
  return (
    <div className="container mx-auto flex-col justify-center items-center bg-main-color   max-w-[1110px] m-0 ">
      <Head>
        <title>Portfolio designs at beautiful prices</title>
        <meta
          name="description"
          content="Come see beautiful and useable design examples to help you get your message to the world."
        />
        <meta
          property="og:title"
          content="When less gives you more- Minimalist Portfolio"
        />
        <meta
          property="og:description"
          content="In a world where we are bombarded with ads and visual clutter the minimalist portfolio lets your customers know who you really are."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className='projectSectionsContainer md:flex md:flex-col md:mb-20 lg:mb-[150px]'>{projectMap}</div>
        <ContactMeSection />
      </main>
    </div>
  );
}
