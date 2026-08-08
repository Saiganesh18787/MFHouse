import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
} from "lucide-react";

export default function CTA() {

  return (

    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-24">

      <div className="mx-auto max-w-5xl px-6 text-center">

        <div className="inline-flex rounded-full bg-white/20 p-4">

          <BarChart3
            size={40}
            className="text-white"
          />

        </div>

        <h2 className="mt-8 text-4xl font-bold text-white">

          Ready to Explore Mutual Funds?

        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">

          Browse detailed analytics, portfolio holdings,
          sector allocation, market cap distribution,
          performance metrics and monthly factsheets —
          all in one place.

        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/funds"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:bg-gray-100"
          >

            Explore Funds

            <ArrowRight
              size={18}
              className="ml-2"
            />

          </Link>

          <Link
            href="/compare"
            className="rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >

            Compare Funds

          </Link>

        </div>

      </div>

    </section>

  );

}