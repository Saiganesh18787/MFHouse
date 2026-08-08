"use client";

import LoginForm from "./components/LoginForm";

export default function LoginPage() {

  return (

    <main className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold">

            MFHouse Admin

          </h1>

          <p className="mt-2 text-gray-500">

            Sign in to continue

          </p>

        </div>

        <LoginForm />

      </div>

    </main>

  );

}