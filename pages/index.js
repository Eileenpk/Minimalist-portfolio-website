import Head from "next/head";
import Image from "next/image";
import ContactMeSection from "./ContactMeSection";
import { gql, GraphQLClient } from "graphql-request";
import WindowSize from "./utils/WindowSize";
import Link from "next/link";
export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const query = gql`
    query {
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
  `;
  const data = await graphQLClient.request(query);
  const sections = data.sections;

  return {
    props: {
      sections,
    },
  };
};

export default function Home({ sections }) {
  const { width } = WindowSize();
  return (
    <div
      className="container mx-auto flex-col justify-center items-center bg-main-color   max-w-[1110px] m-0 "
      id="home"
    >
      <Head>
        <title>
          Minimalist portfolio website beautiful design at a beautiful price
        </title>
        <meta
          name="description"
          content="Come see how we create beautiful and useable design to help you get your message to the world."
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

      <section className="md:relative">
        {width < 768 ? (
          <Image
            className="img"
            src={sections[0].heroPhotoMobile.url}
            alt="hero"
            width={400}
            height={400}
          />
        ) : width < 1024 ? (
          <Image
            className="img"
            src={sections[0].heroPhotoTablet.url}
            alt="hero"
            width={688}
            height={600}
          />
        ) : (
          <Image
            className="img"
            src={sections[0].heroPhotoFullWebsite.url}
            alt="hero"
            width={1110}
            height={600}
          />
        )}
        <div className="max-sm:mt-6 max-md:mt-14 bg-main-color md:absolute md:top-[322px] md:w-[514px] md:h-[278px] md:flex md:flex-col">
          <h1
            className=" heading max-sm:mb-8 max-sm: w-full md:w-[458px] md:h-[126px] md:mt-[56px] leading-[42px] md:mb-[48px]
            "
          >
            {sections[0].tagLine}
          </h1>
          <div className="flex items-center w-48 h-12 tracking-widest bg-btn-color text-main-color md:justify-self-end">
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-btn-second-color">
              <Image
                src="/images/down-arrows.svg"
                alt="down arrows logo"
                width={16}
                height={12}
              />
            </div>
            <a
              href="#about-me"
              className="text-center w-36"
              aria-label="about me button"
            >
              ABOUT ME
            </a>
          </div>
        </div>
      </section>
      <section className="mt-24 md:flex justify-between md:max-w-[1015px]">
        <div className="mb-8">
          {width < 600 ? (
            <Image
              src={sections[0].secondPhotoMobile.url}
              alt="Avatar"
              width={311}
              height={346}
            />
          ) : width < 1000 ? (
            <Image
              src={sections[0].secondPhotoTablet.url}
              alt="Avatar"
              width={281}
              height={600}
            />
          ) : (
            <Image
              src={sections[0].secondPhotoFullWebsite.url}
              alt="Avatar"
              width={540}
              height={600}
            />
          )}
        </div>
        <div
          className="about-me-section border-t-border-color border-t border-b border-b-border-color pt-8 mb-[115px] md:w-[339px]"
          id="about-me"
        >
          <h1 className="heading mb-7">{sections[0].title}</h1>
          <p className="mb-6 ">{sections[0].descriptionText}</p>

          <Link
            aria-label="go to portfolio button"
            className="flex flex-col justify-around prevProjectContainer"
            href="/Portfolio"
          >
            <div className="btn mb-[51px]" >
              GO TO PORTFOLIO
            </div>
          </Link>
        </div>
      </section>

      <ContactMeSection />
    </div>
  );
}
