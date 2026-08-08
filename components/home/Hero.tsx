import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  PieChart,
  Building2,
  Wallet,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">

        <span className="rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          Monthly Mutual Fund Analytics
        </span>

        <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
          Mutual Fund Analytics
          <br />
          Built for
          <span className="text-blue-600">
            {" "}Smarter Investing
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
          Explore official monthly factsheets, analyze fund
          performance, understand portfolio holdings,
          sector allocation and market cap exposure through
          clean, interactive dashboards.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/funds"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Funds

            <ArrowRight
              size={18}
              className="ml-2"
            />
          </Link>

          <Link
            href="/compare"
            className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
          >
            Compare Funds
          </Link>

        </div>

        {/* Feature Cards */}

        <div className="mt-20 grid w-full max-w-6xl gap-6 md:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <BarChart3
              size={34}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-lg font-semibold">
              Performance
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Analyze returns across multiple time periods.
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <Wallet
              size={34}
              className="mx-auto text-emerald-600"
            />

            <h3 className="mt-4 text-lg font-semibold">
              Portfolio
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Explore holdings and diversification.
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <Building2
              size={34}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-lg font-semibold">
              Sector Allocation
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Understand sector-wise exposure.
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <PieChart
              size={34}
              className="mx-auto text-purple-600"
            />

            <h3 className="mt-4 text-lg font-semibold">
              Market Cap
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Large, Mid and Small Cap allocation.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}