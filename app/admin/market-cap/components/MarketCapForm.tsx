"use client";

import { useEffect, useState } from "react";

import { MarketCap } from "@/types/market-cap";

import {
  getFactsheetsWithoutMarketCap,
} from "@/services/admin/market-cap.service";

interface FactsheetOption {

  id: number;

  month: string;

  year: number;

  funds?: {

    id: number;

    name: string;

  } | null;

}

interface MarketCapFormProps {

  mode: "create" | "edit";

  initialValues?: Partial<MarketCap>;

  onSubmit?: (
    values: Omit<
      MarketCap,
      "id" | "created_at" | "factsheets"
    >
  ) => void;

}

type FormData = {

  factsheet_id: number;

  large_cap: string;

  mid_cap: string;

  small_cap: string;

};

export default function MarketCapForm({

  mode,

  initialValues,

  onSubmit,

}: MarketCapFormProps) {

  const [factsheets, setFactsheets] =
    useState<FactsheetOption[]>([]);

  const [formData, setFormData] =
    useState<FormData>({

      factsheet_id: 0,

      large_cap: "",

      mid_cap: "",

      small_cap: "",

    });

  /* ==========================================
      LOAD FACTSHEETS
  ========================================== */

  useEffect(() => {

    if (mode === "edit") return;

    async function loadFactsheets() {

      const data =
        await getFactsheetsWithoutMarketCap();

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

      large_cap:
        initialValues.large_cap?.toString() ?? "",

      mid_cap:
        initialValues.mid_cap?.toString() ?? "",

      small_cap:
        initialValues.small_cap?.toString() ?? "",

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
      VALIDATION
  ========================================== */

  function validate() {

    if (formData.factsheet_id === 0) {

      return "Please select a factsheet.";

    }

    if (!formData.large_cap.trim()) {

      return "Large Cap is required.";

    }

    if (!formData.mid_cap.trim()) {

      return "Mid Cap is required.";

    }

    if (!formData.small_cap.trim()) {

      return "Small Cap is required.";

    }

    const total =

      Number(formData.large_cap) +

      Number(formData.mid_cap) +

      Number(formData.small_cap);

    if (Math.abs(total - 100) > 0.01) {

      return "Large Cap + Mid Cap + Small Cap must equal 100%.";

    }

    return null;

  }

  /* ==========================================
      SUBMIT
  ========================================== */

  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const error =
      validate();

    if (error) {

      alert(error);

      return;

    }

    onSubmit?.({

      factsheet_id:
        Number(formData.factsheet_id),

      large_cap:
        Number(formData.large_cap),

      mid_cap:
        Number(formData.mid_cap),

      small_cap:
        Number(formData.small_cap),

    });

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
    >

      {/* ==========================================
          HEADER
      ========================================== */}

      <div>

        <h2 className="text-xl font-semibold">

          {mode === "create"

            ? "Create Market Cap"

            : "Edit Market Cap"}

        </h2>

        <p className="mt-2 text-gray-500">

          Enter market cap allocation.

        </p>

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

                {factsheet.funds?.name} — {factsheet.month} {factsheet.year}

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
            disabled
            value={`${initialValues?.factsheets?.funds?.name ?? ""} - ${initialValues?.factsheets?.month ?? ""} ${initialValues?.factsheets?.year ?? ""}`}
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2"
          />

        </div>

      )}

      {/* ==========================================
          MARKET CAP
      ========================================== */}

      <div className="grid gap-6 md:grid-cols-3">

        <div>

          <label className="mb-2 block text-sm font-medium">

            Large Cap (%)

          </label>

          <input
            type="number"
            step="0.01"
            name="large_cap"
            value={formData.large_cap}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Mid Cap (%)

          </label>

          <input
            type="number"
            step="0.01"
            name="mid_cap"
            value={formData.mid_cap}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Small Cap (%)

          </label>

          <input
            type="number"
            step="0.01"
            name="small_cap"
            value={formData.small_cap}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

        </div>

      </div>

      {/* ==========================================
          ACTIONS
      ========================================== */}

      <div className="flex justify-end border-t border-gray-200 pt-6">

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >

          {mode === "create"

            ? "Create Market Cap"

            : "Save Changes"}

        </button>

      </div>

    </form>

  );

}