import {
  CheckCircle2,
  FileSpreadsheet,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const reasons = [
  {
    icon: FileSpreadsheet,
    title: "Official Factsheet Data",
    description:
      "Built using official monthly mutual fund factsheets published by AMCs.",
  },
  {
    icon: BarChart3,
    title: "Interactive Analytics",
    description:
      "Transform raw factsheet information into clean dashboards and visual insights.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Information",
    description:
      "Focus on structured data and transparency rather than promotional content.",
  },
  {
    icon: CheckCircle2,
    title: "Built for Investors",
    description:
      "Designed to help investors quickly understand a fund before making decisions.",
  },
];

export default function WhyMFHouse() {
  return (
    <section className="bg-gray-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Why Choose MFHouse
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">

            Mutual Fund Analytics
            <br />
            Made Simple

          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">

            MFHouse helps investors explore and understand
            mutual funds through structured analytics built
            from official monthly factsheets.

          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">

          {reasons.map((reason) => {

            const Icon = reason.icon;

            return (

              <div
                key={reason.title}
                className="flex gap-5 rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-lg"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">

                  <Icon
                    className="text-blue-600"
                    size={28}
                  />

                </div>

                <div>

                  <h3 className="text-xl font-semibold text-gray-900">

                    {reason.title}

                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">

                    {reason.description}

                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}