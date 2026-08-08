import Link from "next/link";

export default function Navbar() {

  return (

    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >

          MFHouse

        </Link>

        {/* Navigation */}

        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >

            Home

          </Link>

          <Link
            href="/funds"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >

            Explore Funds

          </Link>

          <Link
            href="/compare"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >

            Compare

          </Link>

        </div>

        {/* CTA */}

        <Link
          href="/funds"
          className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >

          Get Started

        </Link>

      </div>

    </nav>

  );

}