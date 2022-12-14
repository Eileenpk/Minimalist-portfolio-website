import Image from "next/image"
import NavLinks from "./NavLinks"
export default function Footer () {
    return (
        <footer className='flex justify-center footer text-main-color bg-heading-color ' >
            <div className='flex items-center max-w-[1110px] md:w-full md:px-[40px] lg:px-0  max-sm:justify-center max-sm:flex-col max-sm:pt-14 md:h-20'>
                <Image 
                    className='max-sm:mb-[40px] md:mr-12'
                    src="/images/logo-light.svg"
                    alt="Logo"
                    width={60}
                    height={32}
                />
                <div className='md:mr-auto'><NavLinks /></div>
                <div className=' w-[104px] max-sm:mt-10 max-sm:mb-14 flex justify-between'>
                    <a href="https://github.com/Eileenpk" aria-label="github link">
                        <Image 
                            src="/images/github.svg"
                            alt="Github social link"
                            width={25}
                            height={25}
                        />
                    </a>
                    
                    <a href="https://www.frontendmentor.io/profile/Eileenpk" aria-label="frontend mentor link">
                        <Image 
                            src="/images/twitter.svg"
                            alt="Twitter social link"
                            width={25}
                            height={25}
                        />
                    </a>
                    <a href="https://www.linkedin.com/in/eileen-dangelo/" aria-label="linkedin link">
                        <Image 
                            src="/images/linkedin.svg"
                            alt="Linkedin social link"
                            width={25}
                            height={25}
                        />
                    </a>

                </div>
            </div>
        </footer>
    )
}