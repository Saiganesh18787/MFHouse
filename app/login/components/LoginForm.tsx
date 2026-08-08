"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

export default function LoginForm() {

  const router = useRouter();

  const supabase = createClient();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    setError("");

    const {
      error,
    } = await supabase.auth.signInWithPassword({

      email,

      password,

    });

    if (error) {

      setError(error.message);

      setLoading(false);

      return;

    }

    router.replace("/admin");

    router.refresh();

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>

        <label className="mb-2 block text-sm font-medium">

          Email

        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="admin@example.com"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">

          Password

        </label>

        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-blue-500 focus:outline-none"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >

            {showPassword
              ? <EyeOff size={18} />
              : <Eye size={18} />}

          </button>

        </div>

      </div>

      {error && (

        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">

          {error}

        </div>

      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >

        {loading ? (

          <>

            <Loader2
              size={18}
              className="mr-2 animate-spin"
            />

            Signing In...

          </>

        ) : (

          "Sign In"

        )}

      </button>

    </form>

  );

}