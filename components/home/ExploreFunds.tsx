import Link from "next/link";

import {
  ArrowRight,
  Search,
  TrendingUp,
} from "lucide-react";

const previewFunds = [
  {
    name: "Axis Flexi Cap Fund",
    category: "Flexi Cap",
  },
  {
    name: "Parag Parikh Flexi Cap Fund",
    category: "Flexi Cap",
  },
  {
    name: "HDFC Flexi Cap Fund",
    category: "Flexi Cap",
  },
  {
    name: "SBI Contra Fund",
    category: "Contra",
  },
];

export default function ExploreFunds() {

  return (

    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

            Explore Funds

          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">

            Discover Mutual Funds

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">

            Browse mutual funds, compare categories and
            dive deep into performance, portfolio holdings
            and monthly factsheet analytics.

          </p>

        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm">

          <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 py-3">

            <Search
              size={20}
              className="text-gray-400"
            />

            <span className="ml-3 text-gray-400">

              Search mutual funds...

            </span>

          </div>

          <div className="mt-8 space-y-4">

            {previewFunds.map((fund) => (

              <div
                key={fund.name}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-500 hover:shadow-md"
              >

                <div>

                  <h3 className="font-semibold text-gray-900">

                    {fund.name}

                  </h3>

                  <p className="mt-1 text-sm text-gray-500">

                    {fund.category}

                  </p>

                </div>

                <TrendingUp
                  className="text-blue-600"
                  size={22}
                />

              </div>

            ))}

          </div>

          <div className="mt-10 text-center">

            <Link
              href="/funds"
              className="inline-flex items-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >

              Browse All Funds

              <ArrowRight
                size={18}
                className="ml-2"
              />

            </Link>

          </div>

        </div>

      </div>

    </section>

  );

}