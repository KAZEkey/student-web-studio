"use client";

import { useEffect, useState, type FormEvent } from "react";
import { adminApi, type ServiceRecord } from "@/lib/api";

const empty = { name: "", description: "", is_active: true };

export default function AdminServicesPage() {
  const [items, setItems] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<ServiceRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await adminApi.listServices());
    } catch (e: any) {
      setError(e?.message ?? "Gagal memuat");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (editing) await adminApi.updateService(editing.id, form);
    else await adminApi.createService(form);
    setForm(empty);
    setEditing(null);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Hapus layanan ini?")) return;
    await adminApi.deleteService(id);
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy">Layanan</h1>

      <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-5 shadow-card space-y-4">
        <div>
          <label className="text-sm text-navy/70">Nama</label>
          <input
            required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy"
          />
        </div>
        <div>
          <label className="text-sm text-navy/70">Deskripsi</label>
          <textarea
            rows={2} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox" id="is_active" checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          <label htmlFor="is_active" className="text-sm text-navy/70">Aktif</label>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="rounded-xl bg-violet px-5 py-2 text-sm font-semibold text-white hover:bg-navy">
            {editing ? "Update" : "Tambah"}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm(empty); }} className="rounded-xl border border-line px-5 py-2 text-sm text-navy">
              Batal
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-sm text-navy/60">Memuat...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-navy/5 text-left text-navy/60">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Aktif</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3 text-navy">{s.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-navy/60">{s.slug}</td>
                  <td className="px-4 py-3">{s.is_active ? "✓" : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => { setEditing(s); setForm({ name: s.name, description: s.description ?? "", is_active: s.is_active }); }}
                      className="text-violet underline"
                    >
                      Edit
                    </button>
                    <button type="button" onClick={() => remove(s.id)} className="ml-3 text-red-600 underline">Hapus</button>
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