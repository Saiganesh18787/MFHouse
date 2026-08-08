import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import {
  FundMetadata,
} from "@/types/fund-metadata";

/* ==========================================
    GET METADATA
========================================== */

export async function getMetadata(): Promise<FundMetadata[]> {

  const { data, error } = await supabase
    .from("fund_metadata")
    .select(`
      *,
      funds (
        id,
        name,
        amc,
        category,
        sub_category
      )
    `)
    .order("id");

  if (error) {

    console.error(error);

    return [];

  }

  return (data ?? []).map((record: any) => ({

    ...record,

    funds: record.funds ?? null,

  })) as FundMetadata[];

}

/* ==========================================
    GET METADATA BY ID
========================================== */

export async function getMetadataById(
  id: string
): Promise<FundMetadata | null> {

  const { data, error } = await supabase
    .from("fund_metadata")
    .select(`
      *,
      funds (
        id,
        name,
        amc,
        category,
        sub_category
      )
    `)
    .eq("id", id)
    .single();

  if (error) {

    console.error(error);

    return null;

  }

  return {

    ...data,

    funds: data.funds ?? null,

  } as FundMetadata;

}

/* ==========================================
    CREATE METADATA
========================================== */

export async function createMetadata(
  values: Omit<
    FundMetadata,
    "id" | "funds"
  >
): Promise<FundMetadata> {

  const { data, error } = await supabase
    .from("fund_metadata")
    .insert(values)
    .select()
    .single();

  if (error) {

    throw error;

  }

  return data as FundMetadata;

}

/* ==========================================
    UPDATE METADATA
========================================== */

export async function updateMetadata(
  id: string,
  values: Partial<FundMetadata>
): Promise<void> {

  const { error } = await supabase
    .from("fund_metadata")
    .update(values)
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    DELETE METADATA
========================================== */

export async function deleteMetadata(
  id: number
): Promise<void> {

  const { error } = await supabase
    .from("fund_metadata")
    .delete()
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    GET FUNDS WITHOUT METADATA
========================================== */

export async function getFundsWithoutMetadata() {

  const { data, error } = await supabase
    .from("funds")
    .select(`
      id,
      name,
      amc,
      category,
      sub_category,
      fund_metadata (
        id
      )
    `)
    .order("name");

  if (error) {

    console.error(error);

    return [];

  }

  return (data ?? [])
    .filter((fund: any) => {

      const metadata =
        fund.fund_metadata ?? [];

      return metadata.length === 0;

    })
    .map((fund: any) => ({

      id: fund.id,

      name: fund.name,

      amc: fund.amc,

      category: fund.category,

      sub_category: fund.sub_category,

    }));

}