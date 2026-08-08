"use client";

import { useEffect, useState } from "react";

import { PortfolioSummary } from "@/types/portfolio";

import {
  getFactsheetsWithoutPortfolioSummary,
} from "@/services/admin/portfolio.service";

interface FactsheetOption {

  id: number;

  month: string;

  year: number;

  funds?: {

    id: number;

    name: string;

  } | null;

}

interface PortfolioFormProps {

  mode: "create" | "edit";

  initialValues?: Partial<PortfolioSummary>;

  onSubmit?: (
    values: Omit<
      PortfolioSummary,
      "id" | "factsheets"
    >
  ) => void;

}

type FormData = {

  factsheet_id: number;

  equity: string;

  debt: string;

  cash_and_cash_equivalents: string;

  others: string;

};

const fields = [

  {
    name: "equity",
    label: "Equity (%)",
  },

  {
    name: "debt",
    label: "Debt (%)",
  },

  {
    name: "cash_and_cash_equivalents",
    label: "Cash & Cash Equivalents (%)",
  },

  {
    name: "others",
    label: "Others (%)",
  },

] as const;

export default function PortfolioForm({

  mode,

  initialValues,

  onSubmit,

}: PortfolioFormProps) {

  const [factsheets, setFactsheets] =
    useState<FactsheetOption[]>([]);

  const [formData, setFormData] =
    useState<FormData>({

      factsheet_id: 0,

      equity: "",

      debt: "",

      cash_and_cash_equivalents: "",

      others: "",

    });

  useEffect(() => {

    if (mode === "edit") return;

    async function loadFactsheets() {

      const data =
        await getFactsheetsWithoutPortfolioSummary();

      setFactsheets(data);

    }

    loadFactsheets();

  }, [mode]);

  useEffect(() => {

    if (!initialValues) return;

    setFormData({

      factsheet_id:
        initialValues.factsheet_id ?? 0,

      equity:
        initialValues.equity?.toString() ?? "",

      debt:
        initialValues.debt?.toString() ?? "",

      cash_and_cash_equivalents:
        initialValues.cash_and_cash_equivalents?.toString() ?? "",

      others:
        initialValues.others?.toString() ?? "",

    });

  }, [initialValues]);

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
    function validate() {

    if (
      mode === "create" &&
      formData.factsheet_id === 0
    ) {

      return "Please select a factsheet.";

    }

    return null;

  }

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

      equity:
        Number(formData.equity),

      debt:
        Number(formData.debt),

      cash_and_cash_equivalents:
        Number(formData.cash_and_cash_equivalents),

      others:
        Number(formData.others),

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
            ? "Create Portfolio Summary"
            : "Edit Portfolio Summary"}

        </h2>

      </div>

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

                {factsheet.funds?.name} - {factsheet.month} {factsheet.year}

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

      <div className="grid gap-6 md:grid-cols-2">

        {fields.map(({ name, label }) => (

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

      <div className="flex justify-end border-t border-gray-200 pt-6">

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >

          {mode === "create"
            ? "Create Portfolio Summary"
            : "Save Changes"}

        </button>

      </div>

    </form>

  );

}