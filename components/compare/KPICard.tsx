import {
  TrendingUp,
  TrendingDown,
  PlusCircle,
  MinusCircle,
  BarChart3,
} from "lucide-react";

interface KPICardProps {
  title: string;

  value: number;

  description: string;

  color:
    | "green"
    | "red"
    | "blue"
    | "orange"
    | "gray";
}

const COLORS = {
  green: {
    border: "border-green-200",
    bg: "bg-green-50",
    value: "text-green-600",
    icon: "text-green-600",
  },

  red: {
    border: "border-red-200",
    bg: "bg-red-50",
    value: "text-red-600",
    icon: "text-red-600",
  },

  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    value: "text-blue-600",
    icon: "text-blue-600",
  },

  orange: {
    border: "border-orange-200",
    bg: "bg-orange-50",
    value: "text-orange-600",
    icon: "text-orange-600",
  },

  gray: {
    border: "border-gray-200",
    bg: "bg-gray-50",
    value: "text-gray-900",
    icon: "text-gray-700",
  },
};

export default function KPICard({
  title,
  value,
  description,
  color,
}: KPICardProps) {

  const style = COLORS[color];

  function renderIcon() {

    switch (color) {

      case "green":
        return (
          <PlusCircle
            size={24}
            className={style.icon}
          />
        );

      case "red":
        return (
          <MinusCircle
            size={24}
            className={style.icon}
          />
        );

      case "blue":
        return (
          <TrendingUp
            size={24}
            className={style.icon}
          />
        );

      case "orange":
        return (
          <TrendingDown
            size={24}
            className={style.icon}
          />
        );

      default:
        return (
          <BarChart3
            size={24}
            className={style.icon}
          />
        );

    }

  }

  return (

    <div
      className={`
        rounded-xl
        border
        ${style.border}
        ${style.bg}
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      `}
    >

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-gray-600">
          {title}
        </p>

        {renderIcon()}

      </div>

      <h2
        className={`mt-5 text-4xl font-bold ${style.value}`}
      >
        {value}
      </h2>

      <p className="mt-3 text-sm text-gray-500 leading-6">
        {description}
      </p>

    </div>

  );

}