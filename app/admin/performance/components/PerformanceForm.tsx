"use client";

import { useEffect, useState } from "react";

import { Performance } from "@/types/performance";

import { getFactsheetsWithoutPerformance } from "@/services/admin/performance.service";

interface FactsheetOption {

  id: number;

  month: string;

  year: number;

  funds?: {

    id: number;

    name: string;

  } | null;

}

interface PerformanceFormProps {

  mode: "create" | "edit";

  initialValues?: Partial<Performance>;

  onSubmit?: (
    values: Omit<
      Performance,
      "id" | "factsheets"
    >
  ) => void;

}

export default function PerformanceForm({

  mode,

  initialValues,

  onSubmit,

}: PerformanceFormProps) {

  const [factsheets, setFactsheets] =
    useState<FactsheetOption[]>([]);

  const [formData, setFormData] =
    useState({

      factsheet_id: 0,

      one_month: "",

      three_month: "",

      six_month: "",

      one_year: "",

      three_year: "",

      five_year: "",

      ten_year: "",

      since_inception: "",

    });

  /* ==========================================
      LOAD FACTSHEETS
  ========================================== */

  useEffect(() => {

    if (mode === "edit") return;

    async function loadFactsheets() {

      const data =
        await getFactsheetsWithoutPerformance();

      setFactsheets(data);

    }

    loadFactsheets();

  }, [mode]);

  /* ==========================================
      LOAD INITIAL VALUES
  ========================================== */

  useEffect(() => {

    if (!initialValues) return;

    setFormData({

      factsheet_id:
        initialValues.factsheet_id ?? 0,

      one_month:
        initialValues.one_month?.toString() ?? "",

      three_month:
        initialValues.three_month?.toString() ?? "",

      six_month:
        initialValues.six_month?.toString() ?? "",

      one_year:
        initialValues.one_year?.toString() ?? "",

      three_year:
        initialValues.three_year?.toString() ?? "",

      five_year:
        initialValues.five_year?.toString() ?? "",

      ten_year:
        initialValues.ten_year?.toString() ?? "",

      since_inception:
        initialValues.since_inception?.toString() ?? "",

    });

  }, [initialValues]);

  /* ==========================================
      HANDLE CHANGE
  ========================================== */

  function handleChange(

    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >

  ) {

    const {

      name,

      value,

    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  }

  /* ==========================================
      SUBMIT
  ========================================== */

  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    onSubmit?.({

      factsheet_id:
        Number(formData.factsheet_id),

      one_month:
        Number(formData.one_month),

      three_month:
        Number(formData.three_month),

      six_month:
        Number(formData.six_month),

      one_year:
        Number(formData.one_year),

      three_year:
        Number(formData.three_year),

      five_year:
        Number(formData.five_year),

      ten_year:
        Number(formData.ten_year),

      since_inception:
        Number(formData.since_inception),

    });

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
    >

      <div>

        <h2 className="text-xl font-semibold">

          {mode === "create"
            ? "Create Performance"
            : "Edit Performance"}

        </h2>

      </div>

      {/* ==========================================
          FACTSHEET
      ========================================== */}

      {mode === "create" ? (

        <div>

          <label className="mb-2 block text-sm font-medium">

            Factsheet

          </label>

          <select
            name="factsheet_id"
            value={formData.factsheet_id}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          >

            <option value={0}>

              Select Factsheet

            </option>

            {factsheets.map((factsheet) => (

              <option
                key={factsheet.id}
                value={factsheet.id}
              >

                {factsheet.funds?.name ?? "Unknown Fund"} - {factsheet.month} {factsheet.year}

              </option>

            ))}

          </select>

        </div>

      ) : (

        <div>

          <label className="mb-2 block text-sm font-medium">

            Factsheet

          </label>

          <input
            value={`${initialValues?.factsheets?.funds?.name ?? "Unknown Fund"} - ${initialValues?.factsheets?.month ?? ""} ${initialValues?.factsheets?.year ?? ""}`}
            disabled
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2"
          />

        </div>

      )}

      {/* ==========================================
          RETURNS
      ========================================== */}

      <div className="grid gap-6 md:grid-cols-2">

        {[
          ["one_month", "1 Month"],
          ["three_month", "3 Months"],
          ["six_month", "6 Months"],
          ["one_year", "1 Year"],
          ["three_year", "3 Years"],
          ["five_year", "5 Years"],
          ["ten_year", "10 Years"],
          ["since_inception", "Since Inception"],
        ].map(([name, label]) => (

          <div key={name}>

            <label className="mb-2 block text-sm font-medium">

              {label}

            </label>

            <input
              type="number"
              step="0.01"
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />

          </div>

        ))}

      </div>

      <div className="flex justify-end border-t border-gray-200 pt-6">

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >

          {mode === "create"
            ? "Create Performance"
            : "Save Changes"}

        </button>

      </div>

    </form>

  );

}