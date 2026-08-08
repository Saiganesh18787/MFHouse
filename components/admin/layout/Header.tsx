"use client";

import { useState, useRef, useEffect } from "react";

import { useRouter } from "next/navigation";

import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

import { logout } from "@/services/admin/auth.service";

export default function Header() {

  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (

        dropdownRef.current &&

        !dropdownRef.current.contains(
          event.target as Node
        )

      ) {

        setOpen(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  async function handleLogout() {

    try {

      await logout();

      router.replace("/login");

      router.refresh();

    } catch (error) {

      console.error(
        "Logout failed:",
        error
      );

    }

  }

  return (

    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">

      {/* Search */}

      <div className="relative w-full max-w-md">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search funds, factsheets..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <button className="rounded-full p-2 transition hover:bg-gray-100">

          <Bell size={20} />

        </button>

        <div
          ref={dropdownRef}
          className="relative"
        >

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 transition hover:bg-gray-50"
          >

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">

              A

            </div>

            <div className="text-left">

              <p className="text-sm font-medium">

                Admin

              </p>

              <p className="text-xs text-gray-500">

                Administrator

              </p>

            </div>

            <ChevronDown size={16} />

          </button>

          {open && (

            <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
              >

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>

  );

}