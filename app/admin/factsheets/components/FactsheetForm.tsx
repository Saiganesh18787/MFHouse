"use client";

import { useEffect, useState } from "react";
import { Factsheet } from "@/types/factsheet";
import { Fund } from "@/types/fund";
import { getActiveFunds } from "@/services/admin/factsheets.service";

interface FactsheetFormData {
  fund_id: number;
  month: string;
  year: number;
  publication_date: string;
  pdf_url: string;
}

interface FactsheetFormProps {

  mode: "create" | "edit";

  initialValues?: Partial<Factsheet>;

  onSubmit?: (
    values: FactsheetFormData
  ) => void;

}

export default function FactsheetForm({

  mode,

  initialValues,

  onSubmit,

}: FactsheetFormProps) {

  const [funds, setFunds] =
    useState<Fund[]>([]);

  const [formData, setFormData] =
    useState<FactsheetFormData>({
      fund_id: 0,
      month: "",
      year: new Date().getFullYear(),
      publication_date: "",
      pdf_url: "",
    });

  useEffect(() => {

    async function loadFunds() {

      const data =
        await getActiveFunds();

      setFunds(data);

    }

    loadFunds();

  }, []);

  useEffect(() => {

    if (!initialValues) return;

    setFormData({

      fund_id:
        initialValues.fund_id ?? 0,

      month:
        initialValues.month ?? "",

      year:
        initialValues.year ??
        new Date().getFullYear(),

      publication_date:
        initialValues.publication_date ??
        "",

      pdf_url:
        initialValues.pdf_url ?? "",

    });

  }, [initialValues]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {

    const {

      name,

      value,

    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]:
        name === "fund_id" ||
        name === "year"
          ? Number(value)
          : value,

    }));

  }

  function validate() {

    if (formData.fund_id === 0) {

      return "Please select a fund.";

    }

    if (!formData.month) {

      return "Month is required.";

    }

    if (!formData.publication_date) {

      return "Publication Date is required.";

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

    onSubmit?.(formData);

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
    >

      <div>

        <h2 className="text-xl font-semibold">

          {mode === "create"
            ? "Create Factsheet"
            : "Edit Factsheet"}

        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium">

            Fund

          </label>

          <select
            name="fund_id"
            value={formData.fund_id}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          >

            <option value={0}>

              Select Fund

            </option>

            {funds.map((fund) => (

              <option
                key={fund.id}
                value={fund.id}
              >

                {fund.name}

              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Month

          </label>

          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          >

            <option value="">
              Select Month
            </option>

            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Year

          </label>

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Publication Date

          </label>

          <input
            type="date"
            name="publication_date"
            value={formData.publication_date}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

        </div>

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-medium">

            PDF URL (Optional)

          </label>

          <input
            type="text"
            name="pdf_url"
            value={formData.pdf_url}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

        </div>

      </div>

      <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >

          {mode === "create"
            ? "Create Factsheet"
            : "Save Changes"}

        </button>

      </div>

    </form>

  );

}