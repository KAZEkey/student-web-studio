export type ApiOrderPayload = {
  customer_name: string;
  email: string;
  whatsapp: string;
  project_name: string;
  description?: string;
  budget?: number | null;
  deadline?: string | null;
  service_id: number;
  package_id?: number | null;
};

export type ApiOrderCreated = {
  order_code: string;
  customer_name: string;
  project_name: string;
  status: string;
};

export type ApiOrderStatus = {
  order_code: string;
  customer_name: string;
  project_name: string;
  status: string;
  created_at: string;
  details: { service?: { name: string }; package?: { name: string } }[];
  project?: { progress: number; current_stage: string } | null;
};

export class ApiError extends Error {
  status: number;
  fieldErrors: Record<string, string[]>;
  constructor(message: string, status: number, fieldErrors: Record<string, string[]> = {}) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
const TOKEN_KEY = "sws_admin_token";

export const adminToken = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = adminToken.get();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...init, headers, cache: "no-store" });
  const body = res.headers.get("content-type")?.includes("application/json")
    ? await res.json().catch(() => null)
    : null;
  if (!res.ok) {
    if (res.status === 422 && body?.errors) {
      throw new ApiError(body.message ?? "Validasi gagal", 422, body.errors);
    }
    if (res.status === 401) adminToken.clear();
    throw new ApiError(body?.message ?? "Terjadi kesalahan", res.status);
  }
  return (body?.data ?? body) as T;
}

export const api = {
  createOrder: (p: ApiOrderPayload) =>
    request<ApiOrderCreated>("/orders", { method: "POST", body: JSON.stringify(p) }),
  getOrder: (code: string) => request<ApiOrderStatus>(`/orders/${encodeURIComponent(code)}`),
};

export type AdminUser = { id: number; name: string; email: string; role: string };
export type DashboardStats = {
  total_orders: number;
  new_orders: number;
  in_progress: number;
  completed: number;
  total_customers: number;
  total_revenue: number;
  chart: { month: string; count: number }[];
};
export type AdminOrder = {
  id: number;
  order_code: string;
  customer_name: string;
  email: string;
  whatsapp: string;
  project_name: string;
  description: string | null;
  budget: string | null;
  deadline: string | null;
  status: string;
  created_at: string;
  details: { service?: { id: number; name: string }; package?: { id: number; name: string } }[];
  project?: { progress: number; current_stage: string } | null;
};
export type Paginated<T> = {
  current_page: number;
  data: T[];
  total: number;
  last_page: number;
  per_page: number;
};
export type ServiceRecord = { id: number; name: string; slug: string; description: string | null; is_active: boolean };
export type PackageRecord = { id: number; service_id: number; name: string; price: string | number; timeline: string | null; features: string[] | null };
export type PortfolioRecord = { id: number; title: string; slug: string; category: string | null; description: string | null; project_url: string | null };
export type TestimonialRecord = { id: number; customer_name: string; message: string; rating: number; is_published: boolean };
export type SettingRecord = { id: number; setting_key: string; setting_value: string | null };
export type ProjectRecord = {
  id: number;
  order_id: number;
  progress: number;
  current_stage: string;
  notes: string | null;
  updates: { id: number; title: string; description: string | null; created_at: string }[];
  order?: { order_code: string; customer_name: string; project_name: string };
};

export const adminApi = {
  login: async (email: string, password: string) => {
    const data = await request<{ token: string; user: AdminUser }>("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    adminToken.set(data.token);
    return data;
  },
  logout: async () => {
    try {
      await request("/admin/logout", { method: "POST" });
    } finally {
      adminToken.clear();
    }
  },
  me: () => request<AdminUser>("/admin/me"),
  dashboard: () => request<DashboardStats>("/admin/dashboard"),

  listOrders: (status?: string) =>
    request<Paginated<AdminOrder>>(`/admin/orders${status ? `?status=${encodeURIComponent(status)}` : ""}`),
  getOrder: (id: number) => request<AdminOrder>(`/admin/orders/${id}`),
  updateOrderStatus: (id: number, status: string) =>
    request<{ status: string }>(`/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteOrder: (id: number) => request<{ deleted: boolean }>(`/admin/orders/${id}`, { method: "DELETE" }),

  listServices: () => request<ServiceRecord[]>("/admin/services"),
  createService: (p: Partial<ServiceRecord>) =>
    request<ServiceRecord>("/admin/services", { method: "POST", body: JSON.stringify(p) }),
  updateService: (id: number, p: Partial<ServiceRecord>) =>
    request<ServiceRecord>(`/admin/services/${id}`, { method: "PATCH", body: JSON.stringify(p) }),
  deleteService: (id: number) => request<{ deleted: boolean }>(`/admin/services/${id}`, { method: "DELETE" }),

  listPackages: () => request<PackageRecord[]>("/admin/packages"),
  createPackage: (p: Partial<PackageRecord>) =>
    request<PackageRecord>("/admin/packages", { method: "POST", body: JSON.stringify(p) }),
  updatePackage: (id: number, p: Partial<PackageRecord>) =>
    request<PackageRecord>(`/admin/packages/${id}`, { method: "PATCH", body: JSON.stringify(p) }),
  deletePackage: (id: number) => request<{ deleted: boolean }>(`/admin/packages/${id}`, { method: "DELETE" }),

  listPayments: () => request<any[]>("/admin/payments"),
  createPayment: (p: { order_id: number; amount: number; payment_method?: string }) =>
    request<any>("/admin/payments", { method: "POST", body: JSON.stringify(p) }),
  verifyPayment: (id: number, status: string) =>
    request<any>(`/admin/payments/${id}/verify`, { method: "PATCH", body: JSON.stringify({ status }) }),

  listProjects: () => request<ProjectRecord[]>("/admin/projects"),
  getProject: (id: number) => request<ProjectRecord>(`/admin/projects/${id}`),
  updateProject: (id: number, p: { progress?: number; current_stage?: string; notes?: string }) =>
    request<ProjectRecord>(`/admin/projects/${id}`, { method: "PATCH", body: JSON.stringify(p) }),
  addProjectUpdate: (id: number, p: { title: string; description?: string }) =>
    request<any>(`/admin/projects/${id}/updates`, { method: "POST", body: JSON.stringify(p) }),

  listPortfolio: () => request<PortfolioRecord[]>("/admin/portfolio"),
  createPortfolio: (p: Partial<PortfolioRecord>) =>
    request<PortfolioRecord>("/admin/portfolio", { method: "POST", body: JSON.stringify(p) }),
  updatePortfolio: (id: number, p: Partial<PortfolioRecord>) =>
    request<PortfolioRecord>(`/admin/portfolio/${id}`, { method: "PATCH", body: JSON.stringify(p) }),
  deletePortfolio: (id: number) => request<{ deleted: boolean }>(`/admin/portfolio/${id}`, { method: "DELETE" }),

  listTestimonials: () => request<TestimonialRecord[]>("/admin/testimonials"),
  createTestimonial: (p: Partial<TestimonialRecord>) =>
    request<TestimonialRecord>("/admin/testimonials", { method: "POST", body: JSON.stringify(p) }),
  updateTestimonial: (id: number, p: Partial<TestimonialRecord>) =>
    request<TestimonialRecord>(`/admin/testimonials/${id}`, { method: "PATCH", body: JSON.stringify(p) }),
  deleteTestimonial: (id: number) => request<{ deleted: boolean }>(`/admin/testimonials/${id}`, { method: "DELETE" }),

  listSettings: () => request<SettingRecord[]>("/admin/settings"),
  updateSettings: (settings: { key: string; value: string }[]) =>
    request<SettingRecord[]>("/admin/settings", { method: "PATCH", body: JSON.stringify({ settings }) }),
};