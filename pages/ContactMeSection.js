import Link from "next/link"
import styles from "../styles/Home.module.css"
export default function ContactMeSection () {
    return (
        <section className='w-full flex items-center max-sm:flex-col max-sm:justify-center md:justify-between md:mb-[96px] lg:mb-[150px]'>
            <h1 className='heading max-sm:text-center max-sm:mb-10 md:w-[350px] md:mr-0'>Interested in doing a project together?</h1>
            <div className=' border-t border-t-border-color md:w-[113px] md:h[2px] lg:w-[534px]'></div>
            <div className='btn w-40 max-sm:mb-20'>
            <Link href="/Contact">CONTACT ME</Link>
            </div>
      </section>
    )
}