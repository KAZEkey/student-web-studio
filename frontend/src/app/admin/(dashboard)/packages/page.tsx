"use client";

import { useEffect, useState, type FormEvent } from "react";
import { adminApi, type PackageRecord, type ServiceRecord } from "@/lib/api";

type FormState = { service_id: number; name: string; price: string; timeline: string; features: string };

const empty = { service_id: 1, name: "", price: "0", timeline: "", features: "" };

export default function AdminPackagesPage() {
  const [items, setItems] = useState<PackageRecord[]>([]);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(empty);
  const [editing, setEditing] = useState<PackageRecord | null>(null);

  const load = async () => {
    setLoading(true);
    const [p, s] = await Promise.all([adminApi.listPackages(), adminApi.listServices()]);
    setItems(p);
    setServices(s);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      service_id: Number(form.service_id),
      name: form.name,
      price: String(form.price),
      timeline: form.timeline || undefined,
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    if (editing) await adminApi.updatePackage(editing.id, payload);
    else await adminApi.createPackage(payload);
    setForm(empty);
    setEditing(null);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Hapus paket ini?")) return;
    await adminApi.deletePackage(id);
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy">Paket</h1>

      <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-5 shadow-card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-navy/70">Layanan</label>
            <select
              value={form.service_id}
              onChange={(e) => setForm({ ...form, service_id: Number(e.target.value) })}
              className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy"
            >
              {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-navy/70">Nama</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy" />
          </div>
          <div>
            <label className="text-sm text-navy/70">Harga</label>
            <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy" />
          </div>
          <div>
            <label className="text-sm text-navy/70">Timeline</label>
            <input value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              placeholder="7–14 hari"
              className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy" />
          </div>
        </div>
        <div>
          <label className="text-sm text-navy/70">Fitur (satu per baris)</label>
          <textarea
            rows={4} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })}
            className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy"
          />
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
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-navy/5 text-left text-navy/60">
              <tr>
                <th className="px-4 py-3">Layanan</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Timeline</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((p) => {
                const svc = services.find((s) => s.id === p.service_id);
                return (
                  <tr key={p.id}>
                    <td className="px-4 py-3 text-navy">{svc?.name ?? "-"}</td>
                    <td className="px-4 py-3 text-navy">{p.name}</td>
                    <td className="px-4 py-3 text-navy">{Number(p.price).toLocaleString("id-ID")}</td>
                    <td className="px-4 py-3 text-navy/70">{p.timeline ?? "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(p);
                          setForm({
                            service_id: p.service_id,
                            name: p.name,
                            price: String(p.price),
                            timeline: p.timeline ?? "",
                            features: (p.features ?? []).join("\n"),
                          });
                        }}
                        className="text-violet underline"
                      >
                        Edit
                      </button>
                      <button type="button" onClick={() => remove(p.id)} className="ml-3 text-red-600 underline">Hapus</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}