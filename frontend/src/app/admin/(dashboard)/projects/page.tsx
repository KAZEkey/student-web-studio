"use client";

import { useEffect, useState } from "react";
import { adminApi, type ProjectRecord } from "@/lib/api";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<ProjectRecord | null>(null);
  const [form, setForm] = useState({ progress: 0, current_stage: "", notes: "" });
  const [update, setUpdate] = useState({ title: "", description: "" });

  const load = async () => {
    setLoading(true);
    try {
      setProjects(await adminApi.listProjects());
    } catch (e: any) {
      setError(e?.message ?? "Gagal memuat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openEdit = (p: ProjectRecord) => {
    setEditing(p);
    setForm({ progress: p.progress, current_stage: p.current_stage, notes: p.notes ?? "" });
  };

  const save = async () => {
    if (!editing) return;
    await adminApi.updateProject(editing.id, form);
    setEditing(null);
    load();
  };

  const addUpdate = async () => {
    if (!editing || !update.title) return;
    await adminApi.addProjectUpdate(editing.id, update);
    setUpdate({ title: "", description: "" });
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy">Proyek</h1>
      {loading ? (
        <p className="text-sm text-navy/60">Memuat...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-navy/60">Belum ada proyek. Proyek dibuat otomatis saat pesanan dikonfirmasi.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <div key={p.id} className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-navy/60">{p.order?.order_code}</p>
                  <p className="font-display text-lg font-bold text-navy">{p.order?.project_name}</p>
                  <p className="text-sm text-navy/65">{p.order?.customer_name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => openEdit(p)}
                  className="rounded-xl bg-violet px-4 py-2 text-sm font-semibold text-white hover:bg-navy"
                >
                  Kelola
                </button>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy/70">{p.current_stage}</span>
                  <span className="text-navy">{p.progress}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-navy/10">
                  <div className="h-2 rounded-full bg-violet" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              {p.updates.length > 0 && (
                <ul className="mt-4 space-y-1 text-sm text-navy/70">
                  {p.updates.map((u) => (
                    <li key={u.id} className="rounded-lg bg-soft p-2">
                      <span className="font-semibold">{u.title}</span>
                      {u.description ? ` — ${u.description}` : ""}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-lg font-bold text-navy">Kelola Proyek</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-navy/70">Progres (%)</label>
                <input
                  type="number" min={0} max={100} value={form.progress}
                  onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy"
                />
              </div>
              <div>
                <label className="text-sm text-navy/70">Tahap saat ini</label>
                <input
                  value={form.current_stage}
                  onChange={(e) => setForm({ ...form, current_stage: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy"
                />
              </div>
              <div>
                <label className="text-sm text-navy/70">Catatan</label>
                <textarea
                  rows={3} value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-line px-4 py-2 text-navy"
                />
              </div>
              <button type="button" onClick={save} className="w-full rounded-xl bg-violet py-2 text-sm font-semibold text-white hover:bg-navy">
                Simpan
              </button>
              <hr className="border-line" />
              <p className="text-sm font-semibold text-navy">Tambah update</p>
              <input
                placeholder="Judul update" value={update.title}
                onChange={(e) => setUpdate({ ...update, title: e.target.value })}
                className="w-full rounded-xl border border-line px-4 py-2 text-navy"
              />
              <textarea
                placeholder="Deskripsi (opsional)" rows={2} value={update.description}
                onChange={(e) => setUpdate({ ...update, description: e.target.value })}
                className="w-full rounded-xl border border-line px-4 py-2 text-navy"
              />
              <button type="button" onClick={addUpdate} className="w-full rounded-xl border border-violet py-2 text-sm font-semibold text-violet hover:bg-violet hover:text-white">
                Tambah Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}