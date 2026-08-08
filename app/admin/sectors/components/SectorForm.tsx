"use client";

import { useEffect, useState } from "react";

import { SectorAllocation } from "@/types/sector-allocation";

import {
  getFactsheets,
} from "@/services/admin/sector-allocation.service";

interface FactsheetOption {

  id: number;

  month: string;

  year: number;

  funds?: {

    id: number;

    name: string;

  } | null;

}

interface SectorFormProps {

  mode: "create" | "edit";

  initialValues?: Partial<SectorAllocation>;

  onSubmit?: (
    values: Omit<
      SectorAllocation,
      "id" | "factsheets"
    >
  ) => void;

}

type FormData = {

  factsheet_id: number;

  sector_name: string;

  allocation_percentage: string;

};

export default function SectorForm({

  mode,

  initialValues,

  onSubmit,

}: SectorFormProps) {

  const [factsheets, setFactsheets] =
    useState<FactsheetOption[]>([]);

  const [formData, setFormData] =
    useState<FormData>({

      factsheet_id: 0,

      sector_name: "",

      allocation_percentage: "",

    });

  /* ==========================================
      LOAD FACTSHEETS
  ========================================== */

  useEffect(() => {

    async function loadFactsheets() {

      const data =
        await getFactsheets();

      setFactsheets(data);

    }

    loadFactsheets();

  }, []);

  /* ==========================================
      LOAD INITIAL VALUES
  ========================================== */

  useEffect(() => {

    if (!initialValues) return;

    setFormData({

      factsheet_id:
        initialValues.factsheet_id ?? 0,

      sector_name:
        initialValues.sector_name ?? "",

      allocation_percentage:
        initialValues.allocation_percentage?.toString() ?? "",

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

    if (!formData.sector_name.trim()) {

      return "Sector Name is required.";

    }

    if (!formData.allocation_percentage.trim()) {

      return "Allocation Percentage is required.";

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

      sector_name:
        formData.sector_name,

      allocation_percentage:
        Number(formData.allocation_percentage),

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
            ? "Create Sector Allocation"
            : "Edit Sector Allocation"}

        </h2>

        <p className="mt-2 text-gray-500">

          Enter sector allocation details.

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
          SECTOR
      ========================================== */}

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium">

            Sector Name

          </label>

          <input
            type="text"
            name="sector_name"
            value={formData.sector_name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Allocation Percentage

          </label>

          <input
            type="number"
            step="0.01"
            name="allocation_percentage"
            value={formData.allocation_percentage}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
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
            ? "Create Sector Allocation"
            : "Save Changes"}

        </button>

      </div>

    </form>

  );

}