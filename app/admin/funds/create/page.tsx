"use client";

import { useRouter } from "next/navigation";

import FundForm from "../components/FundForm";

import { createFund } from "@/services/admin/funds.service";
import { Fund } from "@/types/fund";

export default function CreateFundPage() {

  const router = useRouter();

  async function handleCreate(formData: Omit<Fund, "id">) {

    try {

      await createFund(formData);

      alert("Fund created successfully.");

      router.push("/admin/funds");

    } catch (error) {

      console.error(error);

      alert("Failed to create fund.");

    }

  }

  return (

    <div className="space-y-6">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div>

        <h1 className="text-3xl font-bold">
          Create Fund
        </h1>

        <p className="mt-2 text-gray-500">
          Register a new mutual fund.
        </p>

      </div>

      {/* ==========================================
          FORM
      ========================================== */}

      <FundForm
        mode="create"
        onSubmit={handleCreate}
      />

    </div>

  );

}