import Link from "next/link";

export default function NavLinks() {
  return (
    <div className="max-sm:flex max-sm:flex-col max-sm:justify-between max-sm:items-center text-xs h-full tracking-[2px]">
      <Link
        className="mr-10 max-sm:m-0 hover:text-sm hover:font-bold hover:text-hover-color"
        href="/"
        aria-label="go to home page link"
      >
        Home
      </Link>
      <Link
        className="mr-10 max-sm:m-0 max-sm:mt-8 max-sm:mb-8 hover:text-sm hover:font-bold hover:text-hover-color"
        href="/Portfolio"
        aria-label="go to portfolio page link"
      >
        Portfolio
      </Link>
      <Link
        className="hover:text-sm hover:font-bold hover:text-hover-color"
        href="/Contact"
        aria-label="go to contact page link"
      >
        Contact Me
      </Link>
    </div>
  );
}
