"use client";

import { useEffect, useState } from "react";

import { PortfolioHolding } from "@/types/portfolio";

import {
  getFactsheets,
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

interface HoldingFormProps {

  mode: "create" | "edit";

  initialValues?: Partial<PortfolioHolding>;

  onSubmit?: (
    values: Omit<
      PortfolioHolding,
      "id" | "factsheets"
    >
  ) => void;

}

type FormData = {

  factsheet_id: number;

  security_name: string;

  sector: string;

  instrument_type: string;

  allocation_percentage: string;

  quantity: string;

  market_value: string;

  rank: string;

};

const fields = [

  {
    name: "security_name",
    label: "Security Name",
    type: "text",
  },

  {
    name: "sector",
    label: "Sector",
    type: "text",
  },

  {
    name: "instrument_type",
    label: "Instrument Type",
    type: "text",
  },

  {
    name: "allocation_percentage",
    label: "Allocation (%)",
    type: "number",
  },

  {
    name: "quantity",
    label: "Quantity",
    type: "number",
  },

  {
    name: "market_value",
    label: "Market Value",
    type: "number",
  },

  {
    name: "rank",
    label: "Rank",
    type: "number",
  },

] as const;

export default function HoldingForm({

  mode,

  initialValues,

  onSubmit,

}: HoldingFormProps) {

  const [factsheets, setFactsheets] =
    useState<FactsheetOption[]>([]);

  const [formData, setFormData] =
    useState<FormData>({

      factsheet_id: 0,

      security_name: "",

      sector: "",

      instrument_type: "",

      allocation_percentage: "",

      quantity: "",

      market_value: "",

      rank: "",

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

      security_name:
        initialValues.security_name ?? "",

      sector:
        initialValues.sector ?? "",

      instrument_type:
        initialValues.instrument_type ?? "",

      allocation_percentage:
        initialValues.allocation_percentage?.toString() ?? "",

      quantity:
        initialValues.quantity?.toString() ?? "",

      market_value:
        initialValues.market_value?.toString() ?? "",

      rank:
        initialValues.rank?.toString() ?? "",

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

    if (
      mode === "create" &&
      formData.factsheet_id === 0
    ) {

      return "Please select a factsheet.";

    }

    if (!formData.security_name.trim()) {

      return "Security Name is required.";

    }

    if (!formData.instrument_type.trim()) {

      return "Instrument Type is required.";

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

      security_name:
        formData.security_name,

      sector:
        formData.sector || null,

      instrument_type:
        formData.instrument_type,

      allocation_percentage:
        Number(formData.allocation_percentage),

      quantity:
        formData.quantity
          ? Number(formData.quantity)
          : null,

      market_value:
        formData.market_value
          ? Number(formData.market_value)
          : null,

      rank:
        formData.rank
          ? Number(formData.rank)
          : null,

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
            ? "Create Holding"
            : "Edit Holding"}

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

        {fields.map(({ name, label, type }) => (

          <div key={name}>

            <label className="mb-2 block text-sm font-medium">

              {label}

            </label>

            <input
              type={type}
              step={
                type === "number"
                  ? "0.01"
                  : undefined
              }
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
            ? "Create Holding"
            : "Save Changes"}

        </button>

      </div>

    </form>

  );

}