"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { api, type ApiOrderPayload } from "@/lib/api";
import { services, packages, waLink } from "@/lib/site";

const money = (v: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

type FieldErrors = Record<string, string[]>;

const emptyForm = {
  customer_name: "",
  email: "",
  whatsapp: "",
  project_name: "",
  description: "",
  budget: "",
  deadline: "",
  service_id: 1,
  package_id: 1,
};

const STATUS_LABELS: Record<string, string> = {
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

export function OrderClient() {
  const [mode, setMode] = useState<"order" | "check">("order");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ order_code: string; status: string } | null>(null);

  const [checkCode, setCheckCode] = useState("");
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitOrder = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setServerError(null);
    setErrors({});

    const payload: ApiOrderPayload = {
      customer_name: form.customer_name,
      email: form.email,
      whatsapp: form.whatsapp,
      project_name: form.project_name,
      description: form.description || undefined,
      budget: form.budget ? Number(form.budget) : null,
      deadline: form.deadline || null,
      service_id: Number(form.service_id),
      package_id: Number(form.package_id),
    };

    try {
      const res = await api.createOrder(payload);
      setCreated(res);
    } catch (err: any) {
      if (err?.fieldErrors) {
        setErrors(err.fieldErrors);
      }
      setServerError(err?.message ?? "Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  const checkOrder = async (e: FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setCheckError(null);
    setOrderStatus(null);
    try {
      const res = await api.getOrder(checkCode.trim());
      setOrderStatus(res);
    } catch (err: any) {
      setCheckError(err?.status === 404 ? "Kode pesanan tidak ditemukan." : err?.message ?? "Terjadi kesalahan");
    } finally {
      setChecking(false);
    }
  };

  const waMessage = created
    ? `Halo Student Web Studio, saya sudah mengisi form pemesanan.\n\nKode Pesanan: ${created.order_code}\nNama: ${form.customer_name}\nProyek: ${form.project_name}\n\nMohon dibantu untuk konsultasi berikutnya.`
    : "";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10 flex justify-center gap-2 rounded-2xl bg-navy/5 p-1">
        <button
          type="button"
          onClick={() => setMode("order")}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
            mode === "order" ? "bg-white text-navy shadow" : "text-navy/60 hover:text-navy"
          }`}
        >
          Buat Pesanan
        </button>
        <button
          type="button"
          onClick={() => setMode("check")}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
            mode === "check" ? "bg-white text-navy shadow" : "text-navy/60 hover:text-navy"
          }`}
        >
          Cek Status Pesanan
        </button>
      </div>

      {mode === "order" ? (
        created ? (
          <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
            <div className="rounded-2xl bg-emerald-500/10 p-4 text-center">
              <p className="text-sm text-emerald-700 font-semibold">Pesanan berhasil dibuat</p>
            </div>
            <div className="mt-6 space-y-3 text-center">
              <p className="text-navy/70 text-sm">Simpan kode pesanan ini untuk cek status:</p>
              <p className="font-display text-3xl font-bold tracking-tight text-navy">{created.order_code}</p>
              <p className="text-sm text-navy/60">Status saat ini: {STATUS_LABELS[created.status] ?? created.status}</p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-violet text-white text-center px-5 py-3 text-sm font-semibold hover:bg-navy transition"
              >
                Lanjut konsultasi di WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setCreated(null);
                  setForm(emptyForm);
                }}
                className="flex-1 rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-navy hover:border-violet hover:text-violet transition"
              >
                Buat pesanan lain
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-navy/60">
              Untuk cek progres nanti,{" "}
              <button type="button" onClick={() => setMode("check")} className="text-violet underline">
                masuk ke tab Cek Status
              </button>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={submitOrder} className="rounded-3xl border border-line bg-white p-8 shadow-card">
            <div className="grid gap-5">
              <Field label="Nama lengkap" name="customer_name" value={form.customer_name} onChange={onChange} error={errors.customer_name} required />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} required />
                <Field label="Nomor WhatsApp" name="whatsapp" placeholder="62..." value={form.whatsapp} onChange={onChange} error={errors.whatsapp} required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="service_id" className="text-sm font-medium text-navy/70">Jenis website</label>
                  <select
                    id="service_id"
                    name="service_id"
                    value={form.service_id}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-navy focus:border-violet focus:outline-none"
                  >
                    {services.map((s) => (
                      <option key={s.slug} value={String(services.indexOf(s) + 1)}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {errors.service_id && <p className="mt-1 text-xs text-red-600">{errors.service_id[0]}</p>}
                </div>
                <div>
                  <label htmlFor="package_id" className="text-sm font-medium text-navy/70">Paket</label>
                  <select
                    id="package_id"
                    name="package_id"
                    value={form.package_id}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-navy focus:border-violet focus:outline-none"
                  >
                    {packages.map((p) => (
                      <option key={p.slug} value={String(packages.indexOf(p) + 1)}>
                        {p.name} {p.price ? `— ${money(p.price)}` : "— Hubungi"}
                      </option>
                    ))}
                  </select>
                  {errors.package_id && <p className="mt-1 text-xs text-red-600">{errors.package_id[0]}</p>}
                </div>
              </div>
              <Field label="Nama proyek" name="project_name" placeholder="misal: Website UKM Fashion" value={form.project_name} onChange={onChange} error={errors.project_name} required />
              <div>
                <label htmlFor="description" className="text-sm font-medium text-navy/70">Deskripsi kebutuhan</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={form.description}
                  onChange={onChange}
                  placeholder="Jelaskan tujuan website, fitur yang penting, dan audiens."
                  className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-navy focus:border-violet focus:outline-none"
                />
                {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description[0]}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Estimasi anggaran (opsional)" name="budget" type="number" placeholder="1500000" value={form.budget} onChange={onChange} error={errors.budget} />
                <Field label="Target selesai (opsional)" name="deadline" type="date" value={form.deadline} onChange={onChange} error={errors.deadline} />
              </div>
            </div>

            {serverError && (
              <p className="mt-6 rounded-xl bg-red-500/10 p-4 text-sm text-red-700">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full rounded-xl bg-violet px-5 py-3 text-sm font-semibold text-white hover:bg-navy transition disabled:opacity-60"
            >
              {submitting ? "Mengirim..." : "Kirim Pesanan"}
            </button>
            <p className="mt-3 text-center text-xs text-navy/60">
              Setelah form terkirim, kamu akan diarahkan ke WhatsApp untuk melanjutkan konsultasi.
            </p>
          </form>
        )
      ) : (
        <div className="space-y-6">
          <form onSubmit={checkOrder} className="rounded-3xl border border-line bg-white p-8 shadow-card">
            <label htmlFor="check_code" className="text-sm font-medium text-navy/70">Kode pesanan</label>
            <input
              id="check_code"
              value={checkCode}
              onChange={(e) => setCheckCode(e.target.value)}
              placeholder="SWS-XXXXXXXX"
              required
              className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 font-mono text-lg text-navy focus:border-violet focus:outline-none"
            />
            {checkError && (
              <p className="mt-3 rounded-xl bg-red-500/10 p-3 text-sm text-red-700">{checkError}</p>
            )}
            <button
              type="submit"
              disabled={checking}
              className="mt-6 w-full rounded-xl bg-violet px-5 py-3 text-sm font-semibold text-white hover:bg-navy transition disabled:opacity-60"
            >
              {checking ? "Memeriksa..." : "Cek Status"}
            </button>
          </form>

          {orderStatus && (
            <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-navy/60">Kode pesanan</p>
                  <p className="font-mono text-lg font-semibold text-navy">{orderStatus.order_code}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(orderStatus.status)}`}>
                  {STATUS_LABELS[orderStatus.status] ?? orderStatus.status}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Info label="Nama pelanggan" value={orderStatus.customer_name} />
                <Info label="Nama proyek" value={orderStatus.project_name} />
                <Info label="Jenis website" value={orderStatus.details?.[0]?.service?.name ?? "-"} />
                <Info label="Paket" value={orderStatus.details?.[0]?.package?.name ?? "-"} />
                {orderStatus.project && (
                  <>
                    <Info label="Tahap saat ini" value={orderStatus.project.current_stage} />
                    <Info label="Progres" value={`${orderStatus.project.progress}%`} />
                  </>
                )}
              </div>

              {orderStatus.project?.updates?.length ? (
                <div className="mt-6">
                  <p className="text-sm font-medium text-navy/70">Riwayat progres</p>
                  <ul className="mt-2 space-y-2">
                    {orderStatus.project.updates.map((u: any, idx: number) => (
                      <li key={idx} className="rounded-xl bg-soft p-3 text-sm text-navy/75">
                        <span className="font-semibold">{u.title}</span>
                        {u.description ? ` — ${u.description}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string[];
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-navy/70">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-navy focus:border-violet focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error[0]}</p>}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-soft p-4">
      <p className="text-xs text-navy/60">{label}</p>
      <p className="mt-1 text-sm font-semibold text-navy">{value}</p>
    </div>
  );
}