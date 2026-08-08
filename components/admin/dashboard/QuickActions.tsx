import {
  CheckCircle2,
  Clock3,
  FileText,
  BarChart3,
  PieChart,
  Layers3,
} from "lucide-react";

const tasks = [
  {
    title: "Factsheets Imported",
    status: "Completed",
    icon: FileText,
    completed: true,
  },
  {
    title: "Performance Generated",
    status: "Completed",
    icon: BarChart3,
    completed: true,
  },
  {
    title: "Portfolio Holdings",
    status: "In Progress",
    icon: Layers3,
    completed: false,
  },
  {
    title: "Sector Allocation",
    status: "Pending",
    icon: PieChart,
    completed: false,
  },
];

export default function QuickActions() {

  const completed =
    tasks.filter(task => task.completed).length;

  const percentage =
    Math.round((completed / tasks.length) * 100);

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">

            Monthly Operations

          </h2>

          <p className="mt-1 text-sm text-gray-500">

            Track this month's factsheet processing progress.

          </p>

        </div>

        <div className="rounded-lg bg-blue-50 px-4 py-2">

          <p className="text-sm text-gray-500">

            Progress

          </p>

          <p className="text-2xl font-bold text-blue-600">

            {percentage}%

          </p>

        </div>

      </div>

      <div className="mt-6">

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        {tasks.map((task) => {

          const Icon = task.icon;

          return (

            <div
              key={task.title}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-lg bg-blue-50 p-3">

                  <Icon
                    size={22}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <p className="font-medium">

                    {task.title}

                  </p>

                  <p className="text-sm text-gray-500">

                    {task.status}

                  </p>

                </div>

              </div>

              {task.completed ? (

                <CheckCircle2
                  className="text-green-600"
                  size={22}
                />

              ) : (

                <Clock3
                  className="text-amber-500"
                  size={22}
                />

              )}

            </div>

          );

        })}

      </div>

    </div>

  );

}