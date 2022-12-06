import Link from "next/link"
import styles from "../styles/Home.module.css"
export default function ContactMeSection () {
    return (
        <section className={styles.contactMe}>
            <h1>Interested in doing a project together?</h1>
            <div className={styles.hrLine}></div>
            <div className={`${styles.btn} ${styles.contactMeBtn}`}>
            <Link href="/Contact">CONTACT ME</Link>
            </div>
      </section>
    )
}