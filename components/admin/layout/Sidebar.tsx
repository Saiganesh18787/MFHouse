"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Landmark,
  FileText,
  BarChart3,
  TrendingUp,
  Briefcase,
  PieChart,
  CircleDollarSign,
  Database,
  Receipt,
  Settings,
} from "lucide-react";

const navigation = [
  {
    title: "GENERAL",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "DATA MANAGEMENT",
    items: [
      {
        label: "Funds",
        href: "/admin/funds",
        icon: Landmark,
      },
      {
        label: "Factsheets",
        href: "/admin/factsheets",
        icon: FileText,
      },
    ],
  },

  {
    title: "PORTFOLIO DATA",
    items: [
      {
        label: "Metrics",
        href: "/admin/metrics",
        icon: BarChart3,
      },
      {
        label: "Performance",
        href: "/admin/performance",
        icon: TrendingUp,
      },
      {
        label: "Portfolio",
        href: "/admin/portfolio",
        icon: Briefcase,
      },
      {
        label: "Sector Allocation",
        href: "/admin/sectors",
        icon: PieChart,
      },
      {
        label: "Market Cap",
        href: "/admin/market-cap",
        icon: CircleDollarSign,
      },
    ],
  },

  {
    title: "CONFIGURATION",
    items: [
      {
        label: "Metadata",
        href: "/admin/metadata",
        icon: Database,
      },
      {
        label: "Exit Loads",
        href: "/admin/exit-loads",
        icon: Receipt,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">

      {/* ==========================================
          LOGO
      ========================================== */}

      <div className="border-b border-gray-200 p-6">

        <h1 className="text-2xl font-bold text-blue-600">
          MFHouse
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Admin Console
        </p>

      </div>

      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <nav className="flex-1 overflow-y-auto p-4">

        {navigation.map((section) => (

          <div
            key={section.title}
            className="mb-6"
          >

            {/* Section Heading */}

            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">

              {section.title}

            </p>

            {/* Navigation Items */}

            <div className="space-y-1">

              {section.items.map((item) => {

                const Icon = item.icon;

                const active =
                  pathname === item.href;

                return (

                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >

                    <Icon size={20} />

                    <span>
                      {item.label}
                    </span>

                  </Link>

                );

              })}

            </div>

          </div>

        ))}

      </nav>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <div className="border-t border-gray-200 p-4">

        <p className="text-center text-xs text-gray-400">
          Version 1.0.0
        </p>

      </div>

    </aside>

  );

}