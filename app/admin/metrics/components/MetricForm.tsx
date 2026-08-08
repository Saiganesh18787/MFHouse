"use client";

import { useEffect, useState } from "react";

import { Metric } from "@/types/metric";

import {
  getFactsheetsWithoutMetrics,
} from "@/services/admin/metrics.service";

interface FactsheetOption {

  id: number;

  month: string;

  year: number;

  funds?: {

    id: number;

    name: string;

  } | null;

}

interface MetricFormProps {

  mode: "create" | "edit";

  initialValues?: Partial<Metric>;

  onSubmit?: (
    values: Omit<
      Metric,
      "id" | "factsheets"
    >
  ) => void;

}

type FormData = {

  factsheet_id: number;

  regular_growth_nav: string;

  direct_growth_nav: string;

  aum: string;

  regular_expense_ratio: string;

  direct_expense_ratio: string;

  beta: string;

  alpha: string;

  sharpe_ratio: string;

  sortino_ratio: string;

  standard_deviation: string;

  tracking_error: string;

  portfolio_turnover: string;

};

const metricFields = [

  {
    name: "regular_growth_nav",
    label: "Regular Growth NAV",
  },

  {
    name: "direct_growth_nav",
    label: "Direct Growth NAV",
  },

  {
    name: "aum",
    label: "AUM",
  },

  {
    name: "regular_expense_ratio",
    label: "Regular Expense Ratio",
  },

  {
    name: "direct_expense_ratio",
    label: "Direct Expense Ratio",
  },

  {
    name: "beta",
    label: "Beta",
  },

  {
    name: "alpha",
    label: "Alpha",
  },

  {
    name: "sharpe_ratio",
    label: "Sharpe Ratio",
  },

  {
    name: "sortino_ratio",
    label: "Sortino Ratio",
  },

  {
    name: "standard_deviation",
    label: "Standard Deviation",
  },

  {
    name: "tracking_error",
    label: "Tracking Error",
  },

  {
    name: "portfolio_turnover",
    label: "Portfolio Turnover",
  },

] as const;

export default function MetricForm({

  mode,

  initialValues,

  onSubmit,

}: MetricFormProps) {

  const [factsheets, setFactsheets] =
    useState<FactsheetOption[]>([]);

  const [formData, setFormData] =
    useState<FormData>({

      factsheet_id: 0,

      regular_growth_nav: "",

      direct_growth_nav: "",

      aum: "",

      regular_expense_ratio: "",

      direct_expense_ratio: "",

      beta: "",

      alpha: "",

      sharpe_ratio: "",

      sortino_ratio: "",

      standard_deviation: "",

      tracking_error: "",

      portfolio_turnover: "",

    });

  /* ==========================================
      LOAD FACTSHEETS
  ========================================== */

  useEffect(() => {

    if (mode === "edit") return;

    async function loadFactsheets() {

      const data =
        await getFactsheetsWithoutMetrics();

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

      regular_growth_nav:
        initialValues.regular_growth_nav?.toString() ?? "",

      direct_growth_nav:
        initialValues.direct_growth_nav?.toString() ?? "",

      aum:
        initialValues.aum?.toString() ?? "",

      regular_expense_ratio:
        initialValues.regular_expense_ratio?.toString() ?? "",

      direct_expense_ratio:
        initialValues.direct_expense_ratio?.toString() ?? "",

      beta:
        initialValues.beta?.toString() ?? "",

      alpha:
        initialValues.alpha?.toString() ?? "",

      sharpe_ratio:
        initialValues.sharpe_ratio?.toString() ?? "",

      sortino_ratio:
        initialValues.sortino_ratio?.toString() ?? "",

      standard_deviation:
        initialValues.standard_deviation?.toString() ?? "",

      tracking_error:
        initialValues.tracking_error?.toString() ?? "",

      portfolio_turnover:
        initialValues.portfolio_turnover?.toString() ?? "",

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

    if ( mode === "create" &&
  formData.factsheet_id === 0) {

      return "Please select a factsheet.";

    }

    if (!formData.regular_growth_nav.trim()) {

      return "Regular Growth NAV is required.";

    }

    if (!formData.direct_growth_nav.trim()) {

      return "Direct Growth NAV is required.";

    }

    if (!formData.aum.trim()) {

      return "AUM is required.";

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

      regular_growth_nav:
        Number(formData.regular_growth_nav),

      direct_growth_nav:
        Number(formData.direct_growth_nav),

      aum:
        Number(formData.aum),

      regular_expense_ratio:
        Number(formData.regular_expense_ratio),

      direct_expense_ratio:
        Number(formData.direct_expense_ratio),

      beta:
        Number(formData.beta),

      alpha:
        Number(formData.alpha),

      sharpe_ratio:
        Number(formData.sharpe_ratio),

      sortino_ratio:
        Number(formData.sortino_ratio),

      standard_deviation:
        Number(formData.standard_deviation),

      tracking_error:
        Number(formData.tracking_error),

      portfolio_turnover:
        Number(formData.portfolio_turnover),

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
            ? "Create Metric"
            : "Edit Metric"}

        </h2>

        <p className="mt-2 text-gray-500">

          Enter factsheet metrics.

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
          METRICS
      ========================================== */}

      <div className="grid gap-6 md:grid-cols-2">
        {metricFields.map(({ name, label }) => (

          <div key={name}>

            <label className="mb-2 block text-sm font-medium">

              {label}

            </label>

            <input
              type="number"
              step="0.01"
              name={name}
              value={
                formData[
                  name as keyof FormData
                ]
              }
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />

          </div>

        ))}

      </div>

{/* ==========================================
          ACTIONS
========================================== */}

      <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">

        <button
          type="button"
          className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-50"
        >

          Cancel

        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >

          {mode === "create"
            ? "Create Metric"
            : "Save Changes"}

        </button>

      </div>

    </form>

  );

}