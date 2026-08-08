"use client";

import { useEffect, useState } from "react";

import { ExitLoad } from "@/types/exit-load";

import {
  getFactsheets,
} from "@/services/admin/exit-load.service";

interface FactsheetOption {

  id: number;

  month: string;

  year: number;

  funds?: {

    id: number;

    name: string;

  } | null;

}

interface ExitLoadFormProps {

  mode: "create" | "edit";

  initialValues?: Partial<ExitLoad>;

  onSubmit?: (
    values: Omit<
      ExitLoad,
      "id" | "factsheets"
    >
  ) => void;

}

type FormData = {

  factsheet_id: number;

  rule_order: string;

  redemption_within_days: string;

  exit_load_percentage: string;

  description: string;

};

export default function ExitLoadForm({

  mode,

  initialValues,

  onSubmit,

}: ExitLoadFormProps) {

  const [factsheets, setFactsheets] =
    useState<FactsheetOption[]>([]);

  const [formData, setFormData] =
    useState<FormData>({

      factsheet_id: 0,

      rule_order: "",

      redemption_within_days: "",

      exit_load_percentage: "",

      description: "",

    });

  /* ==========================================
      LOAD FACTSHEETS
  ========================================== */

  useEffect(() => {

    if (mode === "edit") return;

    async function loadFactsheets() {

      const data =
        await getFactsheets();

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

      rule_order:
        initialValues.rule_order?.toString() ?? "",

      redemption_within_days:
        initialValues.redemption_within_days?.toString() ?? "",

      exit_load_percentage:
        initialValues.exit_load_percentage?.toString() ?? "",

      description:
        initialValues.description ?? "",

    });

  }, [initialValues]);

  /* ==========================================
      HANDLE CHANGE
  ========================================== */

  function handleChange(

    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
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

    if (!formData.rule_order.trim()) {

      return "Rule Order is required.";

    }

    if (!formData.exit_load_percentage.trim()) {

      return "Exit Load Percentage is required.";

    }

    if (!formData.description.trim()) {

      return "Description is required.";

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

      rule_order:
        Number(formData.rule_order),

      redemption_within_days:
        formData.redemption_within_days === ""
          ? null
          : Number(formData.redemption_within_days),

      exit_load_percentage:
        Number(formData.exit_load_percentage),

      description:
        formData.description,

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

            ? "Create Exit Load Rule"

            : "Edit Exit Load Rule"}

        </h2>

        <p className="mt-2 text-gray-500">

          Enter exit load rule details.

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
          RULE DETAILS
      ========================================== */}

      <div className="grid gap-6 md:grid-cols-3">

        <div>

          <label className="mb-2 block text-sm font-medium">

            Rule Order

          </label>

          <input
            type="number"
            name="rule_order"
            value={formData.rule_order}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Redemption Within Days

          </label>

          <input
            type="number"
            name="redemption_within_days"
            value={formData.redemption_within_days}
            onChange={handleChange}
            placeholder="Leave blank if not applicable"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Exit Load (%)

          </label>

          <input
            type="number"
            step="0.01"
            name="exit_load_percentage"
            value={formData.exit_load_percentage}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

        </div>

      </div>

      {/* ==========================================
          DESCRIPTION
      ========================================== */}

      <div>

        <label className="mb-2 block text-sm font-medium">

          Description

        </label>

        <textarea
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />

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

            ? "Create Exit Load Rule"

            : "Save Changes"}

        </button>

      </div>

    </form>

  );

}