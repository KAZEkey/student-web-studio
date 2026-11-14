"use client";

import { useEffect, useState } from "react";
import { adminApi, type SettingRecord } from "@/lib/api";

export default function AdminSettingsPage() {
  const [items, setItems] = useState<SettingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try { setItems(await adminApi.listSettings()); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await adminApi.updateSettings(
        items.map((s) => ({ key: s.setting_key, value: s.setting_value ?? "" })),
      );
      setMessage("Pengaturan disimpan.");
    } catch (e: any) {
      setMessage(e?.message ?? "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy">Pengaturan</h1>

      {loading ? (
        <p className="text-sm text-navy/60">Memuat...</p>
      ) : (
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card space-y-4">
          {items.map((s, idx) => (
            <div key={s.id}>
              <label className="text-sm text-navy/70">{s.setting_key}</label>
              <input
                value={s.setting_value ?? ""}
                onChange={(e) => {
                  setItems((prev) => prev.map((x, i) => (i === idx ? { ...x, setting_value: e.target.value } : x)));
                }}
                className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy"
              />
            </div>
          ))}
          <button type="button" onClick={save} disabled={saving}
            className="rounded-xl bg-violet px-5 py-2 text-sm font-semibold text-white hover:bg-navy disabled:opacity-60">
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          {message && <p className="text-sm text-navy/70">{message}</p>}
        </div>
      )}
    </div>
  );
}