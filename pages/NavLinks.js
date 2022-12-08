import Link from "next/link";

export default function NavLinks({ className }) {
  return (
    <div className="max-sm:flex max-sm:flex-col max-sm:justify-between max-sm:items-center text-xs h-full tracking-[2px]">
      <Link
        className="max-sm:m-0 mr-10 hover:text-sm hover:font-bold hover:text-hover-color"
        href="/"
      >
        Home
      </Link>
      <Link
        className="max-sm:m-0 max-sm:mt-8 max-sm:mb-8 mr-10 hover:text-sm hover:font-bold hover:text-hover-color"
        href="/Portfolio"
      >
        Portfolio
      </Link>
      <Link
        className="hover:text-sm hover:font-bold hover:text-hover-color"
        href="/Contact"
      >
        Contact Me
      </Link>
    </div>
  );
}
