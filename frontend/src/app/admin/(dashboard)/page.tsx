"use client";

import { useEffect, useState } from "react";
import { adminApi, type DashboardStats, type AdminOrder } from "@/lib/api";

const money = (v: number | string) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(v));

const STATUS_LABELS: Record<string, string> = {
  menunggu_konfirmasi: "Menunggu Konfirmasi",
  konsultasi: "Konsultasi",
  menunggu_pembayaran: "Menunggu Pembayaran",
  dalam_pengerjaan: "Dalam Pengerjaan",
  revisi: "Revisi",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([adminApi.dashboard(), adminApi.listOrders()])
      .then(([s, o]) => {
        setStats(s);
        setOrders(o.data.slice(0, 5));
      })
      .catch((e) => setError(e?.message ?? "Gagal memuat"));
  }, []);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!stats) return <p className="text-sm text-navy/60">Memuat...</p>;

  const cards = [
    { label: "Total Pesanan", value: stats.total_orders },
    { label: "Pesanan Baru", value: stats.new_orders },
    { label: "Dalam Pengerjaan", value: stats.in_progress },
    { label: "Selesai", value: stats.completed },
    { label: "Total Pelanggan", value: stats.total_customers },
    { label: "Total Pendapatan", value: money(stats.total_revenue) },
  ];

  const maxCount = Math.max(...stats.chart.map((c) => c.count), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-sm text-navy/65">Ringkasan pesanan dan proyek.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <p className="text-sm text-navy/60">{c.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-navy">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-bold text-navy">Pesanan 12 bulan terakhir</h2>
        <div className="mt-4 flex items-end gap-2">
          {stats.chart.length === 0 ? (
            <p className="text-sm text-navy/60">Belum ada data.</p>
          ) : (
            stats.chart.map((c) => (
              <div key={c.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t bg-violet/80"
                  style={{ height: `${(c.count / maxCount) * 100}%`, minHeight: 4 }}
                />
                <span className="text-xs text-navy/60">{c.month.slice(5)}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-navy">Pesanan Terbaru</h2>
          <a href="/admin/orders" className="text-sm text-violet underline">Lihat semua</a>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-navy/60">
                <th className="pb-2">Kode</th>
                <th className="pb-2">Pelanggan</th>
                <th className="pb-2">Proyek</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="py-2 font-mono text-navy">{o.order_code}</td>
                  <td className="py-2 text-navy">{o.customer_name}</td>
                  <td className="py-2 text-navy">{o.project_name}</td>
                  <td className="py-2 text-navy/70">{STATUS_LABELS[o.status] ?? o.status}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={4} className="py-3 text-navy/60">Belum ada pesanan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}