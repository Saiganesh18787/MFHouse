"use client";

import { useRouter } from "next/navigation";

import MetadataForm from "../components/MetadataForm";

import {
  createMetadata,
} from "@/services/admin/metadata.service";

import {
  FundMetadata,
} from "@/types/fund-metadata";

export default function CreateMetadataPage() {

  const router = useRouter();

  async function handleSubmit(
    values: Omit<
      FundMetadata,
      "id" | "funds"
    >
  ) {

    try {

      await createMetadata(values);

      alert(
        "Metadata created successfully."
      );

      router.push("/admin/metadata");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create metadata."
      );

    }

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Create Metadata

        </h1>

        <p className="mt-2 text-gray-500">

          Add metadata for a fund.

        </p>

      </div>

      <MetadataForm
        mode="create"
        onSubmit={handleSubmit}
      />

    </div>

  );

}