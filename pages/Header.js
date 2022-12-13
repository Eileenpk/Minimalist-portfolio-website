import Image from "next/image";
import NavLinks from "./NavLinks";
import { useState } from "react";
import WindowSize from "./utils/WindowSize";
export default function Header() {
  const { width } = WindowSize();
  // add clicked state to btn
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked((isClicked) => !isClicked);
  };

  return (
    <header className="flex justify-between items-center static mb-10 w-full max-w-[1110px] pt-8">
      <Image
        className=""
        src="/images/logo.svg"
        alt="Logo"
        width={60}
        height={32}
      />
      {width >= 600 ? (
        <NavLinks />
      ) : (
        <div>
          {isClicked ? (
            <nav>
              <button onClick={handleClick}>
                <Image
                  src="/images/close.svg"
                  width={18}
                  height={18}
                  alt="open nav links"
                />
              </button>
              <div className="max-sm:bg-heading-color max-sm:h-44 max-sm:w-56 max-sm:text-main-color max-sm:py-10 max-sm:absolute max-sm:right-7 max-sm:top-20 ">
                <NavLinks />
              </div>
            </nav>
          ) : (
            <button onClick={handleClick}>
              <Image
                src="/images/hamburger.svg"
                width={24}
                height={13}
                alt="open nav links"
              />
            </button>
          )}
        </div>
      )}
    </header>
  );
}
