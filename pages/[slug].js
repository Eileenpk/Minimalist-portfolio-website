import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import ContactMeSection from "./ContactMeSection";
import { gql, GraphQLClient } from "graphql-request";
import useWindowSize from "./utils/useWindowSize";

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const Slug = pageContext.query.slug;

  const query = gql`
    query ($Slug: String!) {
      projectsArray: projects {
        slug
        title
      }

      projects(where: { slug: $Slug }) {
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
        heroPhotoFullWebsite {
          url
        }
        heroPhotoTablet {
          url
        }
        heroPhotoMobile {
          url
        }
        firstStaticPreviewPhotoFullWebsite {
          url
        }
        firstStaticPreviewPhotoTablet {
          url
        }
        firstStaticPreviewPhotoMobile {
          url
        }
        secondStaticPreviewPhotoFullWebsite {
          url
        }
        secondStaticPreviewPhotoTablet {
          url
        }
        secondStaticPreviewPhotoMobile {
          url
        }
      }
    }
  `;

  const variables = {
    Slug,
  };
  const data = await graphQLClient.request(query, variables);
  const projects = data.projects;
  const projectsArray = data.projectsArray;
  return {
    props: {
      projects,
      projectsArray,
    },
  };
};

export default function page({ projects, projectsArray }) {
  const { width } = useWindowSize();
  const projectMap = projects.map((project) => {
    const currentSlug = projects[0].slug;
    const slugsArray = projectsArray.map((item) => item.slug);

    const findPrevProject = slugsArray.map((slug, i) => {
      if (currentSlug === slug) {
        let newIndex = i - 1;
        if (newIndex < 0) {
          newIndex = slugsArray.length - 1;
        }
        return slugsArray[newIndex];
      } else return;
    });

    const findNextProject = slugsArray.map((slug, i) => {
      if (currentSlug === slug) {
        let newIndex = i + 1;
        if (newIndex > slugsArray.length - 1) {
          newIndex = 0;
        }
        return slugsArray[newIndex];
      } else return;
    });

    return (
      <section className='PortfolioStyle' key={project.slug}>
        <div className=" hero mb-10 lg:mb-[115px]">
          {width < 650 ? (
            <Image
              src={project.heroPhotoMobile.url}
              className="img"
              alt={`${project} hero photo`}
              width={311}
              height={140}
            />
          ) : width < 1200 ? (
            <Image
              src={project.heroPhotoTablet.url}
              className="img"
              alt={`${project} hero photo`}
              width={689}
              height={310}
            />
          ) : (
            <Image
              src={project.heroPhotoFullWebsite.url}
              className="img"
              alt={`${project} hero photo`}
              width={1110}
              height={500}
            />
          )}
        </div>

        <div className=" slugProjectIntro border-t border-t-border-color pt-6 border-b border-b-border-color pb-6 max-sm:mb-[48px] md:py-8 md:mb-10 lg:flex lg:flex-col ">
          <h1 className="title heading max-sm:mb-6 ">{project.title}</h1>
          <p className="text mb-6 md:max-w-[339px]">
            {project.textDescription}
          </p>
          <span className="highlightedText text-hover-color font-bold block max-sm:mb-6 md:mb-4 ">
            Interaction Design / Front End Development <br />
            HTML / CSS / JS{" "}
          </span>
          <div className="websiteBtn btn">
            <Link href={`/${projects.slug}`}>VIEW WEBSITE</Link>
          </div>
        </div>

        <div className="projectBackground lg:w-[635px]">
          <h2 className="subheading mb-7">Project Background</h2>
          <p className="mb-10">{project.projectBackgroundText}</p>
          <h3 className="subheading mb-10">Static Previews</h3>
          {width < 650 ? (
            <div>
              <Image
                src={project.firstStaticPreviewPhotoMobile.url}
                className="img mb-8"
                alt={`${project} first static photo`}
                width={311}
                height={140}
              />

              <Image
                src={project.secondStaticPreviewPhotoMobile.url}
                className="img mb-16"
                alt={`${project} second static photo`}
                width={311}
                height={140}
              />
            </div>
          ) : width < 1200 ? (
            <div>
              <Image
                src={project.firstStaticPreviewPhotoTablet.url}
                className="img mb-8"
                alt={`${project} first static photo`}
                width={689}
                height={434}
              />

              <Image
                src={project.secondStaticPreviewPhotoTablet.url}
                className="img mb-16"
                alt={`${project} second static photo`}
                width={689}
                height={434}
              />
            </div>
          ) : (
            <div>
              <Image
                src={project.firstStaticPreviewPhotoFullWebsite.url}
                className="img mb-8"
                alt={`${project} first static photo`}
                width={635}
                height={400}
              />

              <Image
                src={project.secondStaticPreviewPhotoFullWebsite.url}
                className="img mb-16"
                alt={`${project} second static photo`}
                width={635}
                height={400}
              />
            </div>
          )}
        </div>
        <div className="projectScroll border-t border-t-border-color border-b border-b-border-color h-[148px] flex mb-16 lg:mb-[115px]">
          <div className="border-r border-r-border-color py-6 w-1/2 md:flex justify-start md:py-8">
            <Link
              className="prevProjectContainer flex flex-col justify-around"
              href={`/${findPrevProject.join("")}`}
            >
              <Image
                src="/images/arrow-left.svg"
                className="prevArrowIcon mb-4"
                alt="left arrow"
                width={8}
                height={16}
              />
              <h4 className="prevBtnHeading btnHeading">{findPrevProject}</h4>
              <p className="prevText text-light-font-color">Previous Project</p>
            </Link>
          </div>
          <div className="py-6 w-1/2 flex justify-end md:py-8">
            <Link
              className="nextProjectContainer flex flex-col justify-around items-end "
              href={`/${findNextProject.join("")}`}
            >
              <Image
                src="/images/arrow-right.svg"
                className="nextArrowIcon mb-4"
                alt="right arrow"
                width={8}
                height={16}
              />
              <h4 className="btnHeading">{findNextProject}</h4>
              <p className="text-light-font-color">Next Project</p>
            </Link>
          </div>
        </div>
      </section>
    );
  });
  return (
    <div>
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
      <main className="container mx-auto flex-col justify-center items-center bg-main-color   max-w-[1110px] m-0 ">
        <div>
          {projectMap}
        </div>
        <ContactMeSection />
      </main>
    </div>
  );
}
