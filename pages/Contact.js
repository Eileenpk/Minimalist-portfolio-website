import Head from "next/head";
import Image from "next/image";
import { gql, GraphQLClient } from "graphql-request";
import ContactForm from "./utils/ContactForm";

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
export default function Contact({ sections }) {
  return (
    <div className="container mx-auto flex-col justify-center items-center max-w-[1110px]">
      <Head>
        <title>Contact us</title>
        <meta
          name="description"
          content="Contact us to see how we can help you build your dream into a reality"
        />
        <meta property="og:title" content="Contact us- Minimalist Portfolio" />
        <meta
          property="og:description"
          content="Contact us today to see how we can make your dreams come true!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="justify-between pt-6 mb-8 border-t border-b border-t-border-color border-b-border-color lg:flex">
          <h1 className="mb-6 heading">{sections[1].title}</h1>
          <div className="lg:w-[635px]">
            <p>{sections[1].descriptionText}</p>
            <div className=" w-[104px] mt-6 mb-8 max-sm:mb-14 flex justify-between">
              <a href="https://github.com/Eileenpk" aria-label="github link">
                <Image
                  src="/images/github-dark.svg"
                  alt="Github social link"
                  width={25}
                  height={25}
                />
              </a>

              <a href="https://www.frontendmentor.io/profile/Eileenpk" aria-label="frontend mentor link">
                <Image
                  src="/images/twitter-dark.svg"
                  alt="Twitter social link"
                  width={25}
                  height={25}
                />
              </a>
              <a href="https://www.linkedin.com/in/eileen-dangelo/" aria-label="linkedin link">
                <Image
                  src="/images/linkedin-dark.svg"
                  alt="Linkedin social link"
                  width={25}
                  height={25}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="justify-between lg:flex">
          <h2 className="mb-6 heading">Contact Me</h2>
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
