"use client";

import { useMemo, useState } from "react";

import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { ExitLoad } from "@/types/exit-load";

import ExitLoadTable from "./ExitLoadTable";

interface ExitLoadAccordionProps {

  exitLoads: ExitLoad[];

  onRefresh: () => Promise<void>;

}

export default function ExitLoadAccordion({

  exitLoads,

  onRefresh,

}: ExitLoadAccordionProps) {

  const [expanded, setExpanded] =
    useState<Record<number, boolean>>({});

  const grouped = useMemo(() => {

    const map = new Map<number, ExitLoad[]>();

    exitLoads.forEach((rule) => {

      const key = rule.factsheet_id;

      if (!map.has(key)) {

        map.set(key, []);

      }

      map.get(key)!.push(rule);

    });

    return Array.from(map.values());

  }, [exitLoads]);

  return (

    <div className="space-y-4">

      {grouped.map((rules) => {

        const first = rules[0];

        const factsheet =
          first.factsheets;

        const isOpen =
          expanded[first.factsheet_id] ?? false;

        return (

          <div
            key={first.factsheet_id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >

            <button
              onClick={() =>
                setExpanded((prev) => ({
                  ...prev,
                  [first.factsheet_id]:
                    !isOpen,
                }))
              }
              className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-gray-50"
            >

              <div>

                <h3 className="text-lg font-semibold">

                  {factsheet?.funds?.name}

                </h3>

                <p className="mt-1 text-sm text-gray-500">

                  {factsheet?.month} {factsheet?.year}
                  {" • "}
                  {rules.length} Rule
                  {rules.length > 1 ? "s" : ""}

                </p>

              </div>

              {isOpen ? (

                <ChevronDown size={22} />

              ) : (

                <ChevronRight size={22} />

              )}

            </button>

            {isOpen && (

              <div className="border-t border-gray-200">

                <ExitLoadTable
                  rules={rules}
                  onRefresh={onRefresh}
                />

              </div>

            )}

          </div>

        );

      })}

    </div>

  );

}