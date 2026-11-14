"use client";

import { useEffect, useState, type FormEvent } from "react";
import { adminApi, type TestimonialRecord } from "@/lib/api";

const empty = { customer_name: "", message: "", rating: 5, is_published: true };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<TestimonialRecord | null>(null);

  const load = async () => {
    setLoading(true);
    try { setItems(await adminApi.listTestimonials()); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (editing) await adminApi.updateTestimonial(editing.id, form);
    else await adminApi.createTestimonial(form);
    setForm(empty);
    setEditing(null);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Hapus testimoni ini?")) return;
    await adminApi.deleteTestimonial(id);
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy">Testimoni</h1>

      <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-5 shadow-card space-y-4">
        <div>
          <label className="text-sm text-navy/70">Nama pelanggan</label>
          <input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy" />
        </div>
        <div>
          <label className="text-sm text-navy/70">Pesan</label>
          <textarea required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy" />
        </div>
        <div className="flex items-center gap-4">
          <div>
            <label className="text-sm text-navy/70">Rating</label>
            <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className="mt-1 rounded-xl border border-line px-4 py-2 text-navy">
              {[1,2,3,4,5].map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <input type="checkbox" id="pub" checked={form.is_published}
              onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
            <label htmlFor="pub" className="text-sm text-navy/70">Terpublikasi</label>
          </div>
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
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Pesan</th>
                <th className="px-4 py-3">★</th>
                <th className="px-4 py-3">Pub</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3 text-navy">{t.customer_name}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-navy/70">{t.message}</td>
                  <td className="px-4 py-3 text-navy">{t.rating}</td>
                  <td className="px-4 py-3">{t.is_published ? "✓" : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => { setEditing(t); setForm({ customer_name: t.customer_name, message: t.message, rating: t.rating, is_published: t.is_published }); }} className="text-violet underline">Edit</button>
                    <button type="button" onClick={() => remove(t.id)} className="ml-3 text-red-600 underline">Hapus</button>
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