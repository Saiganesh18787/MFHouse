import Link from "next/link";

export default function Footer() {

  return (

    <footer className="border-t border-gray-200 bg-white">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">

        <div>

          <h3 className="text-xl font-bold text-blue-600">

            MFHouse

          </h3>

          <p className="mt-2 text-sm text-gray-500">

            Mutual Fund Analytics Platform

          </p>

        </div>

        <div className="flex gap-8 text-sm">

          <Link
            href="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/funds"
            className="hover:text-blue-600"
          >
            Funds
          </Link>

          <Link
            href="/compare"
            className="hover:text-blue-600"
          >
            Compare
          </Link>

          <Link
            href="/admin"
            className="hover:text-blue-600"
          >
            Admin
          </Link>

        </div>

      </div>

      <div className="border-t border-gray-100 py-5 text-center text-sm text-gray-500">

        © 2026 MFHouse. All rights reserved.

      </div>

    </footer>

  );

}