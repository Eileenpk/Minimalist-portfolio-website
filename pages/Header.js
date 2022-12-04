import styles from "../styles/Header.module.css";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { useState, useEffect } from "react";
import useWindowSize from "./utils/useWindowSize";
export default function Header({ className }) {
  const { width } = useWindowSize();
  // add clicked state to btn
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked((isClicked) => !isClicked);
  };

  return (
    <header className={className}>
      <Image
        className={styles.logo}
        src="/images/logo.svg"
        alt="Logo"
        width={60}
        height={32}
      />
      {width >= 600 ? (
        <NavLinks className={styles.longNavLinks} />
      ) : (
        <div className={styles.navContainer}>
          {!isClicked ? (
            <button onClick={handleClick} className={styles.button}>
              <Image
                className={styles.hamburger}
                src="/images/hamburger.svg"
                width={24}
                height={13}
                alt="open nav links"
              />
            </button>
          ) : (
            <nav className={styles.nav}>
              <button onClick={handleClick} className={styles.button}>
                <Image
                  className={styles.close}
                  src="/images/close.svg"
                  width={18}
                  height={18}
                  alt="open nav links"
                />
              </button>
              <NavLinks className={styles.navlinks} />
            </nav>
          )}
        </div>
      )}
    </header>
  );
}
