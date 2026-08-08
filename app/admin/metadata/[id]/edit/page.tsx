"use client";

import { useEffect, useState } from "react";

import {

  useParams,

  useRouter,

} from "next/navigation";

import MetadataForm from "../../components/MetadataForm";

import {

  getMetadataById,

  updateMetadata,

} from "@/services/admin/metadata.service";

import {

  FundMetadata,

} from "@/types/fund-metadata";

export default function EditMetadataPage() {

  const params = useParams();

  const router = useRouter();

  const [metadata, setMetadata] =
    useState<FundMetadata | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadMetadata() {

      if (!params.id) return;

      const data =
        await getMetadataById(
          params.id as string
        );

      setMetadata(data);

      setLoading(false);

    }

    loadMetadata();

  }, [params.id]);

  async function handleSubmit(
    values: Partial<FundMetadata>
  ) {

    try {

      await updateMetadata(
        params.id as string,
        values
      );

      alert(
        "Metadata updated successfully."
      );

      router.push("/admin/metadata");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update metadata."
      );

    }

  }

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-10">

        Loading...

      </div>

    );

  }

  if (!metadata) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-10">

        Metadata not found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Metadata

        </h1>

        <p className="mt-2 text-gray-500">

          Update fund metadata.

        </p>

      </div>

      <MetadataForm
        mode="edit"
        initialValues={metadata}
        onSubmit={handleSubmit}
      />

    </div>

  );

}