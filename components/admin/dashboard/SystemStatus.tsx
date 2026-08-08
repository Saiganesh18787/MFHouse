import {
  Database,
  Landmark,
  Building2,
  FileText,
  Briefcase,
  BarChart3,
  CalendarClock,
} from "lucide-react";

const stats = [
  {
    label: "Funds",
    value: "0",
    icon: Landmark,
  },
  {
    label: "AMCs",
    value: "0",
    icon: Building2,
  },
  {
    label: "Factsheets",
    value: "0",
    icon: FileText,
  },
  {
    label: "Portfolio Holdings",
    value: "0",
    icon: Briefcase,
  },
  {
    label: "Performance Records",
    value: "0",
    icon: BarChart3,
  },
  {
    label: "Last Sync",
    value: "--",
    icon: CalendarClock,
  },
];

export default function SystemStatus() {

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-indigo-50 p-3">

          <Database
            size={22}
            className="text-indigo-600"
          />

        </div>

        <div>

          <h2 className="text-xl font-semibold">

            Database Overview

          </h2>

          <p className="text-sm text-gray-500">

            Current platform statistics.

          </p>

        </div>

      </div>

      <div className="mt-6 space-y-4">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3 transition hover:bg-gray-50"
            >

              <div className="flex items-center gap-3">

                <Icon
                  size={18}
                  className="text-gray-500"
                />

                <span className="text-sm font-medium">

                  {item.label}

                </span>

              </div>

              <span className="font-semibold">

                {item.value}

              </span>

            </div>

          );

        })}

      </div>

    </div>

  );

}