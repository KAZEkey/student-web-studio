"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@studentwebstudio.id");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminApi.login(email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err?.message ?? "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy/5 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-card">
        <h1 className="font-display text-2xl font-bold text-navy">Masuk Admin</h1>
        <p className="mt-2 text-sm text-navy/65">Student Web Studio — panel pengelolaan pesanan.</p>

        <div className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-navy/70">Email</label>
            <input
              id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-navy focus:border-violet focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-navy/70">Password</label>
            <input
              id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-navy focus:border-violet focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit" disabled={loading}
          className="mt-6 w-full rounded-xl bg-violet px-5 py-3 text-sm font-semibold text-white hover:bg-navy transition disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}