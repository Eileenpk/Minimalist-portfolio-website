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
    nameError: "",
    emailError: "",
    messageError:"",
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

  const handleFormErrors = () => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(contactForm.email)) {
      setContactForm((prevContactForm) => {
        return {
          ...prevContactForm,
          emailError: "Not a valid email",
        };
      });
    } else if(emailRegex.test(contactForm.email)) {
      setContactForm((prevContactForm) => {
        return {
          ...prevContactForm,
          emailError: "",
        };
      });
    }

    
    if (!contactForm.name) {
      setContactForm(prevContactForm => {
        return {
          ...prevContactForm,
          nameError: "This field is required",
        }
      })
    }else {
      setContactForm(prevContactForm => {
        return{
          ...prevContactForm,
          nameError: ''
        }
    })
    }
    if(!contactForm.message) {
      setContactForm(prevContactForm => {
        return{
          ...prevContactForm,
          messageError: "This field is required"
        }
      })
    }else {
      setContactForm(prevContactForm => {
        return{
          ...prevContactForm,
          messageError: ''
        }
      })
    }
   
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormErrors();
  };

  return (
    <div className="container mx-auto flex-col justify-center items-center max-w-[1110px]">
      <Header />
      <main>
        <div className="justify-between pt-6 mb-8 border-t border-b border-t-border-color border-b-border-color lg:flex">
          <h1 className="mb-6 heading">{sections[1].title}</h1>
          <div className="lg:w-[635px]">
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
        <div className="justify-between lg:flex">
          <h2 className="mb-6 heading">Contact Me</h2>
          
          <form 
            className="contactMeForm flex flex-col lg:w-[635px]"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="name"
              aria-label="name"
              className="mb-2 font-bold text-heading-color"
            >
              Name
            </label>
            <input
              className={`h-12 mb-6 bg-form-input-color indent-4 ${contactForm.nameError? 'border border-solid border-error-color mb-1' : ''}`}
              id="name"
              type="text"
              placeholder="Jane Appleseed"
              onChange={handleChange}
              name="name"
              value={contactForm.name}
            />
            <div className='mb-6 text-xs text-error-color'>{contactForm.nameError}</div>
            <label
              htmlFor="email"
              aria-label="email"
              className="mb-2 font-bold text-heading-color"
            >
              Email Address
            </label>
            <input
              className={`h-12 mb-6 bg-form-input-color indent-4 ${contactForm.emailError? 'border border-solid border-error-color mb-1' : ''}`}
              id="email"
              type="text"
              placeholder="email@example.com"
              onChange={handleChange}
              name="email"
              value={contactForm.email}
            />
            <div className='mb-6 text-xs text-error-color'>{contactForm.emailError ? contactForm.emailError : '' }</div>
            <label
              htmlFor="message"
              aria-label="message"
              className="mb-2 font-bold text-heading-color"
            >
              Message
            </label>
            <textarea
              className={`h-16 mb-6 bg-form-input-color indent-4 ${contactForm.messageError? 'border border-solid border-error-color mb-1' : ''}`}
              id="message"
              value={contactForm.message}
              placeholder="How can I help?"
              onChange={handleChange}
              name="message"
            />
            <div className='mb-6 text-xs text-error-color'>{contactForm.messageError}</div>
            <button
              className="mb-20 btn bg-btn-color text-main-color"
              type="submit"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
