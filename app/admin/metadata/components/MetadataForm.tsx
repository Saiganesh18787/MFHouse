"use client";

import { useEffect, useState } from "react";

import { FundMetadata } from "@/types/fund-metadata";

import {
  getFundsWithoutMetadata,
} from "@/services/admin/metadata.service";

interface FundOption {

  id: number;

  name: string;

  amc?: string;

  category?: string;

  sub_category?: string;

}

interface MetadataFormProps {

  mode: "create" | "edit";

  initialValues?: Partial<FundMetadata>;

  onSubmit?: (
    values: Omit<
      FundMetadata,
      "id" | "funds"
    >
  ) => void;

}

type FormData = {

  fund_id: number;

  benchmark_name: string;

  risk_level: string;

  investment_objective: string;

};

const riskLevels = [

  "Low",
  "Moderately Low",
  "Moderate",
  "Moderately High",
  "High",
  "Very High",

];

export default function MetadataForm({

  mode,

  initialValues,

  onSubmit,

}: MetadataFormProps) {

  const [funds, setFunds] =
    useState<FundOption[]>([]);

  const [formData, setFormData] =
    useState<FormData>({

      fund_id: 0,

      benchmark_name: "",

      risk_level: "",

      investment_objective: "",

    });

  /* ==========================================
      LOAD FUNDS
  ========================================== */

  useEffect(() => {

    if (mode === "edit") return;

    async function loadFunds() {

      const data =
        await getFundsWithoutMetadata();

      setFunds(data);

    }

    loadFunds();

  }, [mode]);

  /* ==========================================
      LOAD INITIAL VALUES
  ========================================== */

  useEffect(() => {

    if (!initialValues) return;

    setFormData({

      fund_id:
        initialValues.fund_id ?? 0,

      benchmark_name:
        initialValues.benchmark_name ?? "",

      risk_level:
        initialValues.risk_level ?? "",

      investment_objective:
        initialValues.investment_objective ?? "",

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

    if (formData.fund_id === 0) {

      return "Please select a fund.";

    }

    if (!formData.benchmark_name.trim()) {

      return "Benchmark Name is required.";

    }

    if (!formData.risk_level.trim()) {

      return "Risk Level is required.";

    }

    if (!formData.investment_objective.trim()) {

      return "Investment Objective is required.";

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

      fund_id:
        Number(formData.fund_id),

      benchmark_name:
        formData.benchmark_name,

      risk_level:
        formData.risk_level,

      investment_objective:
        formData.investment_objective,

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

            ? "Create Metadata"

            : "Edit Metadata"}

        </h2>

        <p className="mt-2 text-gray-500">

          Enter fund metadata.

        </p>

      </div>

      {/* ==========================================
          FUND
      ========================================== */}

      {mode === "create" ? (

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

      ) : (

        <div>

          <label className="mb-2 block text-sm font-medium">

            Fund

          </label>

          <input
            disabled
            value={initialValues?.funds?.name ?? ""}
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2"
          />

        </div>

      )}

      {/* ==========================================
          BENCHMARK
      ========================================== */}

      <div>

        <label className="mb-2 block text-sm font-medium">

          Benchmark Name

        </label>

        <input
          type="text"
          name="benchmark_name"
          value={formData.benchmark_name}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />

      </div>

      {/* ==========================================
          RISK LEVEL
      ========================================== */}

      <div>

        <label className="mb-2 block text-sm font-medium">

          Risk Level

        </label>

        <select
          name="risk_level"
          value={formData.risk_level}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        >

          <option value="">

            Select Risk Level

          </option>

          {riskLevels.map((risk) => (

            <option
              key={risk}
              value={risk}
            >

              {risk}

            </option>

          ))}

        </select>

      </div>

      {/* ==========================================
          INVESTMENT OBJECTIVE
      ========================================== */}

      <div>

        <label className="mb-2 block text-sm font-medium">

          Investment Objective

        </label>

        <textarea
          name="investment_objective"
          rows={6}
          value={formData.investment_objective}
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

            ? "Create Metadata"

            : "Save Changes"}

        </button>

      </div>

    </form>

  );

}