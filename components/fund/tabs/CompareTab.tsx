"use client";

import { useEffect, useState } from "react";

import CompareDashboard from "@/components/compare/CompareDashboard";

import { getComparison } from "@/services/comparison.service";
import { getFactsheetsByFund } from "@/services/factsheet.service";

import { ComparisonResponse } from "@/types/comparison";

interface CompareTabProps {
  fundId: number;
}

export default function CompareTab({
  fundId,
}: CompareTabProps) {

  const [comparison, setComparison] =
    useState<ComparisonResponse | null>(null);

  const [factsheets, setFactsheets] =
    useState<
      {
        id: number;
        month: string;
        year: number;
        publication_date: string;
      }[]
    >([]);

  const [comparisonIndex, setComparisonIndex] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    async function loadComparison() {

      try {

        setLoading(true);

        setError(null);

        /* ==========================================
           LOAD ALL FACTSHEETS
        ========================================== */

        const allFactsheets =
          await getFactsheetsByFund(fundId);

        if (allFactsheets.length < 2) {

          setError(
            "At least two factsheets are required."
          );

          return;

        }

        setFactsheets(allFactsheets);

        console.log(
          "Factsheets:",
          allFactsheets
        );

        /* ==========================================
           LOAD CURRENT COMPARISON
           (Will change in Sprint 6.8.3)
        ========================================== */

        const response =
          await getComparison(
            allFactsheets[
      comparisonIndex + 1
    ].id,
    allFactsheets[
      comparisonIndex
    ].id
          );

        if (!response) {

          setError(
            "Unable to load comparison."
          );

          return;

        }

        setComparison(response);

      } catch (err) {

        console.error(err);

        setError(
          "Something went wrong."
        );

      } finally {

        setLoading(false);

      }

    }

    loadComparison();

  }, [fundId,comparisonIndex]);

  function handlePreviousComparison() {

  if (
    comparisonIndex >=
    factsheets.length - 2
  ) {
    return;
  }

  setComparisonIndex(
    (index) => index + 1
  );

}

function handleNextComparison() {

  if (comparisonIndex === 0) {
    return;
  }

  setComparisonIndex(
    (index) => index - 1
  );

}

const canGoPrevious =
  comparisonIndex <
  factsheets.length - 2;

const canGoNext =
  comparisonIndex > 0;
  /* ============================
     LOADING
  ============================ */

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

        <p className="text-gray-500">
          Loading comparison...
        </p>

      </div>

    );

  }

  /* ============================
     ERROR
  ============================ */

  if (error) {

    return (

      <div className="rounded-xl border border-red-200 bg-red-50 p-12 text-center">

        <p className="text-red-600">
          {error}
        </p>

      </div>

    );

  }

  /* ============================
     NO DATA
  ============================ */

  if (!comparison) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

        <p className="text-gray-500">
          No comparison data available.
        </p>

      </div>

    );

  }

  /* ============================
     SUCCESS
  ============================ */

  return (

    <CompareDashboard
  comparison={comparison}
  onPreviousComparison={
    handlePreviousComparison
  }
  onNextComparison={
    handleNextComparison
  }
  canGoPrevious={
    canGoPrevious
  }
  canGoNext={
    canGoNext
  }
/>

  );

}