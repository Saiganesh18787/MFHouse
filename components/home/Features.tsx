import {
  BarChart3,
  PieChart,
  Building2,
  Wallet,
  FileText,
  Scale,
} from "lucide-react";

const features = [
  {
    title: "Performance Analytics",
    description:
      "Analyze historical returns and track mutual fund performance over different time periods.",
    icon: BarChart3,
    color: "text-blue-600",
  },
  {
    title: "Portfolio Holdings",
    description:
      "Explore top holdings and understand how each fund is diversified.",
    icon: Wallet,
    color: "text-emerald-600",
  },
  {
    title: "Sector Allocation",
    description:
      "Visualize sector-wise exposure with clean and interactive charts.",
    icon: Building2,
    color: "text-orange-500",
  },
  {
    title: "Market Cap Allocation",
    description:
      "Understand the allocation across Large, Mid and Small Cap companies.",
    icon: PieChart,
    color: "text-purple-600",
  },
  {
    title: "Monthly Factsheets",
    description:
      "Browse historical factsheets and monitor changes month after month.",
    icon: FileText,
    color: "text-cyan-600",
  },
  {
    title: "Fund Comparison",
    description:
      "Compare mutual funds side-by-side. Coming Soon.",
    icon: Scale,
    color: "text-rose-600",
    comingSoon: true,
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Everything You Need to Analyze Mutual Funds
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            MFHouse transforms official mutual fund factsheets into
            interactive dashboards, making fund analysis easier and
            more insightful.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (

              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div
                  className={`inline-flex rounded-xl bg-gray-100 p-4 ${feature.color}`}
                >
                  <Icon size={30} />
                </div>

                <div className="mt-6 flex items-center gap-3">

                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  {feature.comingSoon && (
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                      Coming Soon
                    </span>
                  )}

                </div>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}