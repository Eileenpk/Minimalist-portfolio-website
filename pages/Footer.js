import Image from "next/image"
import styles from "../styles/Footer.module.css";
import NavLinks from "./NavLinks"
export default function Footer ({className}) {
    return (
        <footer className={className} >
        
            <Image 
                className={styles.logo}
                src="/images/logo-light.svg"
                alt="Logo"
                width={60}
                height={32}
            />
            <NavLinks className={styles.footerLinks}/>

            <div className={styles.socialLinks}>
                <a href="https://github.com/Eileenpk">
                    <Image 
                        src="/images/github.svg"
                        alt="Logo"
                        width={25}
                        height={25}
                    />
                </a>
                
                <a href="https://www.frontendmentor.io/profile/Eileenpk">
                    <Image 
                        src="/images/twitter.svg"
                        alt="Logo"
                        width={25}
                        height={25}
                    />
                </a>
                <a href="https://www.linkedin.com/in/eileen-dangelo/">
                    <Image 
                        src="/images/linkedin.svg"
                        alt="Logo"
                        width={25}
                        height={25}
                    />
                </a>

            </div>

            
        </footer>
    )
}