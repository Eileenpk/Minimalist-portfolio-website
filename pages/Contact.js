import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "./Header";
import { useState } from "react";
import { gql, GraphQLClient } from "graphql-request";

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
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(event) {
    const { name, value, type } = event.target;
    setContactForm((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  console.log(contactForm);
  return (
    <div className="container mx-auto flex-col justify-center items-center max-w-[1110px]">
      <Header />
      <main>
        <div className="border-t-border-color border-t border-b border-b-border-color mb-8 pt-6 lg:flex justify-between">
          <h1 className="heading mb-6">{sections[1].title}</h1>
          <div className='lg:w-[635px]'>
            <p>{sections[1].descriptionText}</p>
            <div className=" w-[104px] mt-6 mb-8 max-sm:mb-14 flex justify-between">
              <a href="https://github.com/Eileenpk">
                <Image
                  src="/images/github-dark.svg"
                  alt="Github social link"
                  width={25}
                  height={25}
                />
              </a>

              <a href="https://www.frontendmentor.io/profile/Eileenpk">
                <Image
                  src="/images/twitter-dark.svg"
                  alt="Twitter social link"
                  width={25}
                  height={25}
                />
              </a>
              <a href="https://www.linkedin.com/in/eileen-dangelo/">
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
        <div className='lg:flex justify-between'>
          <h2 className="heading mb-6">Contact Me</h2>
          <form className="contactMeForm flex flex-col lg:w-[635px]">
            <label
              for="name"
              aria-label="name"
              className="text-heading-color font-bold mb-2"
            >
              Name
            </label>
            <input
              className="bg-form-input-color h-12 indent-4 mb-6"
              id="name"
              type="text"
              placeholder="Jane Appleseed"
              onChange={handleChange}
              name="name"
              value={contactForm.name}
            />
            <label
              for="email"
              aria-label="email"
              className="text-heading-color font-bold mb-2"
            >
              Email Address
            </label>
            <input
              className="bg-form-input-color h-12 indent-4 mb-6"
              id="email"
              type="text"
              placeholder="email@example.com"
              onChange={handleChange}
              name="email"
              value={contactForm.email}
            />
            <label
              for="message"
              aria-label="message"
              className="text-heading-color font-bold mb-2"
            >
              Message
            </label>
            <textarea
              className="bg-form-input-color h-12 indent-4 mb-6"
              id="message"
              value={contactForm.message}
              placeholder="How can I help?"
              onChange={handleChange}
              name="message"
            />

            <div className="btn bg-btn-color text-main-color mb-20">
              <Link href={""}>SEND MESSAGE</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
