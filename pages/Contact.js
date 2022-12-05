import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./Header";
import Footer from "./Footer"
import { gql, GraphQLClient } from 'graphql-request'
import useWindowSize from "./utils/useWindowSize";

export default function Contact() {
    return (
        <div className={styles.container}>
            <Header className={styles.header}/>
            <main>
                <h1>Contact</h1>
            </main>
            <Footer className={styles.footer}/>
        </div>
        
    )
}