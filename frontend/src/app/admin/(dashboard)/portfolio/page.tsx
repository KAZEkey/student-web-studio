"use client";

import { useEffect, useState, type FormEvent } from "react";
import { adminApi, type PortfolioRecord } from "@/lib/api";

const empty = { title: "", category: "", description: "", project_url: "" };

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<PortfolioRecord | null>(null);

  const load = async () => {
    setLoading(true);
    try { setItems(await adminApi.listPortfolio()); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (editing) await adminApi.updatePortfolio(editing.id, form);
    else await adminApi.createPortfolio(form);
    setForm(empty);
    setEditing(null);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Hapus portfolio ini?")) return;
    await adminApi.deletePortfolio(id);
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy">Portfolio</h1>

      <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-5 shadow-card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-navy/70">Judul</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy" />
          </div>
          <div>
            <label className="text-sm text-navy/70">Kategori</label>
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy" />
          </div>
        </div>
        <div>
          <label className="text-sm text-navy/70">Deskripsi</label>
          <textarea rows={3} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy" />
        </div>
        <div>
          <label className="text-sm text-navy/70">URL proyek (opsional)</label>
          <input value={form.project_url ?? ""} onChange={(e) => setForm({ ...form, project_url: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="rounded-xl bg-violet px-5 py-2 text-sm font-semibold text-white hover:bg-navy">
            {editing ? "Update" : "Tambah"}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm(empty); }} className="rounded-xl border border-line px-5 py-2 text-sm text-navy">Batal</button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-sm text-navy/60">Memuat...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-navy/5 text-left text-navy/60">
              <tr>
                <th className="px-4 py-3">Judul</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 text-navy">{p.title}</td>
                  <td className="px-4 py-3 text-navy/70">{p.category ?? "-"}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => { setEditing(p); setForm({ title: p.title, category: p.category ?? "", description: p.description ?? "", project_url: p.project_url ?? "" }); }} className="text-violet underline">Edit</button>
                    <button type="button" onClick={() => remove(p.id)} className="ml-3 text-red-600 underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}