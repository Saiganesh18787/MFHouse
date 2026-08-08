import {
  CheckCircle2,
  Clock3,
  FileText,
  Landmark,
  BarChart3,
  Briefcase,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "July 2026 Factsheet Imported",
    description: "Axis Small Cap Fund",
    time: "10:42 AM",
    icon: FileText,
    completed: true,
  },
  {
    id: 2,
    title: "Portfolio Updated",
    description: "Parag Parikh Flexi Cap",
    time: "10:15 AM",
    icon: Briefcase,
    completed: true,
  },
  {
    id: 3,
    title: "New Fund Created",
    description: "HDFC Manufacturing Fund",
    time: "09:50 AM",
    icon: Landmark,
    completed: true,
  },
  {
    id: 4,
    title: "Performance Calculation",
    description: "Pending validation",
    time: "09:20 AM",
    icon: BarChart3,
    completed: false,
  },
];

export default function ActivityTable() {

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">

          Today's Activity

        </h2>

        <p className="mt-1 text-sm text-gray-500">

          Recent administrative operations performed today.

        </p>

      </div>

      <div className="space-y-6">

        {activities.map((activity) => {

          const Icon = activity.icon;

          return (

            <div
              key={activity.id}
              className="flex items-start gap-4"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`rounded-full p-2 ${
                    activity.completed
                      ? "bg-green-100"
                      : "bg-amber-100"
                  }`}
                >

                  <Icon
                    size={18}
                    className={
                      activity.completed
                        ? "text-green-600"
                        : "text-amber-600"
                    }
                  />

                </div>

                {activity.id !== activities.length && (

                  <div className="mt-2 h-10 w-px bg-gray-200" />

                )}

              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3 className="font-medium text-gray-900">

                    {activity.title}

                  </h3>

                  <span className="text-sm text-gray-500">

                    {activity.time}

                  </span>

                </div>

                <p className="mt-1 text-sm text-gray-500">

                  {activity.description}

                </p>

              </div>

              {activity.completed ? (

                <CheckCircle2
                  className="text-green-600"
                  size={20}
                />

              ) : (

                <Clock3
                  className="text-amber-500"
                  size={20}
                />

              )}

            </div>

          );

        })}

      </div>

    </div>

  );

}