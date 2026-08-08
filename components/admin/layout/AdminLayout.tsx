interface AdminLayoutProps {
  children: React.ReactNode;
}

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex">

        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">

          <Header />

          <main className="flex-1 bg-gray-50">

                <div className="mx-auto max-w-7xl p-8">

                    {children}

                </div>

            </main>

        </div>

      </div>

    </div>
  );
}