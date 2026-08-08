import {
  Landmark,
  FileText,
  Briefcase,
  Calendar,
} from "lucide-react";

import StatCard from "@/components/admin/dashboard/StatCard";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import ActivityTable from "@/components/admin/dashboard/ActivityTable";
import SystemStatus from "@/components/admin/dashboard/SystemStatus";

export default function AdminPage() {
  return (
    <div className="space-y-8">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back! Here's an overview of your platform.
        </p>

      </div>

      {/* ==========================================
          KPI CARDS
      ========================================== */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Funds"
          value="0"
          subtitle="+0 this month"
          icon={<Landmark size={24} />}
        />

        <StatCard
          title="Factsheets"
          value="0"
          subtitle="+0 uploaded this month"
          icon={<FileText size={24} />}
        />

        <StatCard
          title="Holdings"
          value="0"
          subtitle="+0 today"
          icon={<Briefcase size={24} />}
        />

        <StatCard
          title="Last Upload"
          value="—"
          subtitle="No uploads yet"
          icon={<Calendar size={24} />}
        />

      </section>

      {/* ==========================================
          QUICK ACTIONS + SYSTEM STATUS
      ========================================== */}

      <section className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <QuickActions />

        </div>

        <SystemStatus />

      </section>

      {/* ==========================================
          RECENT ACTIVITY
      ========================================== */}

      <section>

        <ActivityTable />

      </section>

    </div>
  );
}