import Link from 'next/link';

export default function NavLinks ({className}) {
    return (
        <div className={className}>
                    <Link href="/">Home</Link>
                    <Link href="/Portfolio">Portfolio</Link>
                    <Link href="/Contact">Contact Me</Link>
        </div>
    )
}