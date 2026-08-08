"use client";

import { useEffect, useState } from "react";

import { Fund } from "@/types/fund";

interface FundFormProps {
  mode: "create" | "edit";

  initialValues?: Partial<Fund>;

  onSubmit?: (values: FundFormData) => void;
}

interface FundFormData {
  scheme_code: string;
  amfi_code: string;
  name: string;
  amc: string;
  category: string;
  sub_category: string;
  plan: string;
  option: string;
  status: string;
}

export default function FundForm({
  mode,
  initialValues,
  onSubmit,
}: FundFormProps) {

  const [formData, setFormData] = useState<FundFormData>(() => {
    if (initialValues) {
      return {
        scheme_code: initialValues.scheme_code || "",
        amfi_code: initialValues.amfi_code || "",
        name: initialValues.name || "",
        amc: initialValues.amc || "",
        category: initialValues.category || "",
        sub_category: initialValues.sub_category || "",
        plan: initialValues.plan || "Direct",
        option: initialValues.option || "Growth",
        status: initialValues.status || "Active",
      };
    }
    return {
      scheme_code: "",
      amfi_code: "",
      name: "",
      amc: "",
      category: "",
      sub_category: "",
      plan: "",
      option: "",
      status: "",
    };
  });

  useEffect(() => {

  if (!initialValues) return;

  setFormData({
    scheme_code: initialValues.scheme_code ?? "",
    amfi_code: initialValues.amfi_code ?? "",
    name: initialValues.name ?? "",
    amc: initialValues.amc ?? "",
    category: initialValues.category ?? "",
    sub_category: initialValues.sub_category ?? "",
    plan: initialValues.plan ?? "Direct",
    option: initialValues.option ?? "Growth",
    status: initialValues.status ?? "Active",
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
    [name]: value,
  }));

}

function validate() {

  if (!formData.scheme_code.trim()) {
    return "Scheme Code is required.";
  }

  if (!formData.name.trim()) {
    return "Fund Name is required.";
  }

  if (!formData.amc.trim()) {
    return "AMC is required.";
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

    <form className="space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>

      {/* ==========================================
          HEADER
      ========================================== */}

      <div>

        <h2 className="text-xl font-semibold text-gray-900">

          {mode === "create"
            ? "Create Fund"
            : "Edit Fund"}

        </h2>

        <p className="mt-2 text-gray-500">

          Enter mutual fund information.

        </p>

      </div>

      {/* ==========================================
          BASIC INFORMATION
      ========================================== */}

      <section>

        <h3 className="mb-4 text-lg font-semibold">

          Basic Information

        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Scheme Code */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Scheme Code

            </label>

            <input
              type="text"
              name="scheme_code"
              value={formData.scheme_code}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />

          </div>

          {/* AMFI Code */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              AMFI Code

            </label>

            <input
              type="text"
              name="amfi_code"
              value={formData.amfi_code}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />

          </div>

          {/* Fund Name */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium">

              Fund Name

            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />

          </div>

          {/* AMC */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium">

              AMC

            </label>

            <input
              type="text"
              name="amc"
              value={formData.amc}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

        </div>

      </section>

      {/* ==========================================
          CATEGORY
      ========================================== */}

      <section>

        <h3 className="mb-4 text-lg font-semibold">

          Category

        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Category

            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Sub Category

            </label>

            <input
              type="text"
              name="sub_category"
              value={formData.sub_category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />

          </div>

        </div>

      </section>

      {/* ==========================================
          PLAN
      ========================================== */}

      <section>

        <h3 className="mb-4 text-lg font-semibold">

          Plan Details

        </h3>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Plan

            </label>

            <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          >
            <option value="Direct">Direct</option>
            <option value="Regular">Regular</option>
          </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Option

            </label>

            <select
              name="option"
              value={formData.option}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="Growth">Growth</option>
              <option value="IDCW">IDCW</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Status

            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

      </section>

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
            ? "Create Fund"
            : "Save Changes"}
        </button>

      </div>

    </form>

  );

}