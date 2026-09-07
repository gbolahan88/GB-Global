"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
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
    <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 text-xl font-black shadow-xl shadow-blue-500/20">
            GB
          </div>

          <h1 className="mt-6 text-3xl font-black">
            GB Global Admin
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Sign in to manage your business
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-[28px] border border-white/10 bg-white/4 p-7 shadow-2xl backdrop-blur-xl"
        >

          {error && (
            <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div>

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-white/70"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
            />

          </div>

          <div className="mt-5">

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-white/70"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 px-5 py-4 text-sm font-bold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <p className="mt-6 text-center text-xs text-white/25">
          GB Global Services LTD • Management Portal
        </p>

      </div>

    </main>
  );
}