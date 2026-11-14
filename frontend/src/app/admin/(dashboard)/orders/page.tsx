"use client";

import { useEffect, useState } from "react";
import { adminApi, type AdminOrder } from "@/lib/api";

const STATUSES = [
  "menunggu_konfirmasi",
  "konsultasi",
  "menunggu_pembayaran",
  "dalam_pengerjaan",
  "revisi",
  "selesai",
  "dibatalkan",
];
const LABELS: Record<string, string> = {
  menunggu_konfirmasi: "Menunggu Konfirmasi",
  konsultasi: "Konsultasi",
  menunggu_pembayaran: "Menunggu Pembayaran",
  dalam_pengerjaan: "Dalam Pengerjaan",
  revisi: "Revisi",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

const statusClass = (s: string) =>
  s === "selesai"
    ? "bg-emerald-500/10 text-emerald-700"
    : s === "dibatalkan"
      ? "bg-red-500/10 text-red-700"
      : s === "dalam_pengerjaan" || s === "revisi"
        ? "bg-violet-500/10 text-violet"
        : "bg-navy/10 text-navy/75";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<AdminOrder | null>(null);

  const load = async (status?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.listOrders(status || undefined);
      setOrders(res.data);
    } catch (e: any) {
      setError(e?.message ?? "Gagal memuat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(filter); }, [filter]);

  const changeStatus = async (order: AdminOrder, status: string) => {
    try {
      await adminApi.updateOrderStatus(order.id, status);
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)));
      if (selected?.id === order.id) setSelected({ ...selected, status });
    } catch (e: any) {
      alert(e?.message ?? "Gagal ubah status");
    }
  };

  const remove = async (order: AdminOrder) => {
    if (!confirm(`Hapus pesanan ${order.order_code}?`)) return;
    await adminApi.deleteOrder(order.id);
    setOrders((prev) => prev.filter((o) => o.id !== order.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-navy">Pesanan</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-line bg-white px-4 py-2 text-sm text-navy"
        >
          <option value="">Semua status</option>
          {STATUSES.map((s) => <option key={s} value={s}>{LABELS[s]}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-navy/60">Memuat...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-navy/5 text-left text-navy/60">
              <tr>
                <th className="px-4 py-3">Kode</th>
                <th className="px-4 py-3">Pelanggan</th>
                <th className="px-4 py-3">Proyek</th>
                <th className="px-4 py-3">Anggaran</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-navy/5">
                  <td className="px-4 py-3 font-mono text-navy">{o.order_code}</td>
                  <td className="px-4 py-3">
                    <p className="text-navy">{o.customer_name}</p>
                    <p className="text-xs text-navy/60">{o.email}</p>
                  </td>
                  <td className="px-4 py-3 text-navy">{o.project_name}</td>
                  <td className="px-4 py-3 text-navy">{o.budget ? Number(o.budget).toLocaleString("id-ID") : "-"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => changeStatus(o, e.target.value)}
                      className={`rounded-lg px-2 py-1 text-xs font-semibold ${statusClass(o.status)}`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{LABELS[s]}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => setSelected(o)} className="text-violet underline">Detail</button>
                    <button type="button" onClick={() => remove(o)} className="ml-3 text-red-600 underline">Hapus</button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-6 text-center text-navy/60">Belum ada pesanan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-navy/60">Detail pesanan</p>
                <p className="font-mono text-lg font-semibold text-navy">{selected.order_code}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="text-navy/60 hover:text-navy">✕</button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Field label="Nama" value={selected.customer_name} />
              <Field label="Email" value={selected.email} />
              <Field label="WhatsApp" value={selected.whatsapp} />
              <Field label="Proyek" value={selected.project_name} />
              <Field label="Layanan" value={selected.details?.[0]?.service?.name ?? "-"} />
              <Field label="Paket" value={selected.details?.[0]?.package?.name ?? "-"} />
              <Field label="Anggaran" value={selected.budget ? Number(selected.budget).toLocaleString("id-ID") : "-"} />
              <Field label="Deadline" value={selected.deadline?.slice(0, 10) ?? "-"} />
              <Field label="Status" value={LABELS[selected.status] ?? selected.status} />
              {selected.project && (
                <>
                  <Field label="Tahap" value={selected.project.current_stage} />
                  <Field label="Progres" value={`${selected.project.progress}%`} />
                </>
              )}
            </div>
            {selected.description && (
              <div className="mt-4 rounded-2xl bg-soft p-4">
                <p className="text-xs text-navy/60">Deskripsi</p>
                <p className="mt-1 text-sm text-navy">{selected.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-soft p-3">
      <p className="text-xs text-navy/60">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-navy">{value}</p>
    </div>
  );
}