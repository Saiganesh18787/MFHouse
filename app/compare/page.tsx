import Link from "next/link";
export const dynamic = "force-dynamic";
import {
  ArrowRight,
  Lock,
  BarChart3,
} from "lucide-react";

const rows = [
  "3Y CAGR",
  "5Y CAGR",
  "Expense Ratio",
  "Risk Level",
  "Portfolio Holdings",
  "Sector Allocation",
  "Market Cap Allocation",
  "Exit Load",
];

export default function ComparePage() {

  return (

    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-indigo-50">

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">

          <div className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">

            🚧 Development Preview

          </div>

          <h1 className="mt-8 text-5xl font-bold text-gray-900">

            Compare Mutual Funds

          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">

            Side-by-side comparison of mutual funds across
            performance, portfolio holdings, sector allocation,
            market cap exposure and much more.

          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/funds"
              className="inline-flex items-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >

              Browse Funds

              <ArrowRight
                size={18}
                className="ml-2"
              />

            </Link>

            <Link
              href="/"
              className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold transition hover:border-blue-600 hover:text-blue-600"
            >

              Back Home

            </Link>

          </div>

        </div>

      </section>

      {/* Preview */}

      <section className="py-20">

        <div className="mx-auto max-w-6xl px-6">

          <div className="mb-10 text-center">

            <h2 className="text-3xl font-bold">

              Comparison Preview

            </h2>

            <p className="mt-3 text-gray-500">

              Here's a preview of the upcoming comparison dashboard.

            </p>

          </div>

          <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">

            {/* Header */}

            <div className="grid grid-cols-3 border-b bg-gray-100 p-5 font-semibold">

              <div>Metric</div>

              <div className="text-center">

                Axis Flexi Cap

              </div>

              <div className="text-center">

                Parag Parikh Flexi Cap

              </div>

            </div>

            {/* Rows */}

            {rows.map((row, index) => (

              <div
                key={row}
                className={`grid grid-cols-3 items-center border-b p-5 ${
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                }`}
              >

                <div className="font-medium">

                  {row}

                </div>

                <div className="text-center">

                  <div className="mx-auto h-4 w-32 rounded-full bg-gray-300 blur-[1px]" />

                </div>

                <div className="text-center">

                  <div className="mx-auto h-4 w-32 rounded-full bg-gray-300 blur-[1px]" />

                </div>

              </div>

            ))}

          </div>

          {/* Locked */}

          <div className="mt-12 rounded-3xl bg-blue-600 p-10 text-center text-white shadow-xl">

            <Lock
              className="mx-auto"
              size={42}
            />

            <h3 className="mt-5 text-3xl font-bold">

              Comparison Engine Coming Soon

            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-blue-100">

              We're building a powerful comparison engine
              that will allow investors to compare mutual
              funds across every important metric in one
              interactive dashboard.

            </p>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="pb-24">

        <div className="mx-auto max-w-6xl px-6">

          <div className="rounded-3xl border bg-white p-12 shadow-sm">

            <div className="mb-8 flex items-center gap-3">

              <BarChart3
                className="text-blue-600"
                size={28}
              />

              <h2 className="text-3xl font-bold">

                What's Included

              </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {[
                "Performance Comparison",
                "Portfolio Holdings",
                "Sector Allocation",
                "Market Cap Allocation",
                "Exit Load Comparison",
                "Fund Metadata",
                "Historical Factsheets",
                "Interactive Charts",
              ].map((feature) => (

                <div
                  key={feature}
                  className="flex items-center gap-4 rounded-xl bg-gray-50 p-5"
                >

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">

                    ✓

                  </div>

                  <span className="font-medium">

                    {feature}

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}
