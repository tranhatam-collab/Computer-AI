import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface Product { id: string; name: string; tier: string; highlights: string[]; }
interface Run { id: string; state: string; productId: string; text: string; createdAt: number; }
interface Approval { id: string; action: string; resource: string; state: "pending" | "approved" | "rejected"; reason?: string; }
interface User { id: string; email: string; name: string; locale: "vi" | "en"; }

async function apiFetch(path: string, options?: RequestInit) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
  });
  const json = await res.json();
  return json;
}

function useLocaleLabels(locale: "vi" | "en") {
  return useMemo(() => ({
    tabs: {
      command: locale === "vi" ? "Lệnh" : "Command",
      tasks: locale === "vi" ? "Tác vụ" : "Tasks",
      approvals: locale === "vi" ? "Duyệt" : "Approvals",
      results: locale === "vi" ? "Kết quả" : "Results",
    },
    login: {
      title: locale === "vi" ? "Đăng nhập" : "Sign in",
      registerTitle: locale === "vi" ? "Đăng ký" : "Sign up",
      email: locale === "vi" ? "Email" : "Email",
      name: locale === "vi" ? "Tên" : "Name",
      loginBtn: locale === "vi" ? "Đăng nhập" : "Sign in",
      registerBtn: locale === "vi" ? "Đăng ký" : "Sign up",
      switchLogin: locale === "vi" ? "Đã có tài khoản? Đăng nhập" : "Have an account? Sign in",
      switchRegister: locale === "vi" ? "Chưa có tài khoản? Đăng ký" : "No account? Sign up",
      error: locale === "vi" ? "Lỗi" : "Error",
      logout: locale === "vi" ? "Đăng xuất" : "Logout",
    },
    command: {
      title: locale === "vi" ? "Lệnh mới" : "New Command",
      product: locale === "vi" ? "Chọn sản phẩm" : "Select product",
      placeholder: locale === "vi" ? "Nhập lệnh..." : "Type command...",
      submit: locale === "vi" ? "Gửi" : "Send",
      sending: locale === "vi" ? "Đang gửi..." : "Sending...",
      created: locale === "vi" ? "Đã tạo tác vụ" : "Task created",
    },
    tasks: {
      title: locale === "vi" ? "Tác vụ" : "Tasks",
      empty: locale === "vi" ? "Chưa có tác vụ" : "No tasks yet",
      loading: "Loading...",
    },
    approvals: {
      title: locale === "vi" ? "Duyệt" : "Approvals",
      empty: locale === "vi" ? "Không có yêu cầu" : "No pending approvals",
      approve: locale === "vi" ? "Duyệt" : "Approve",
      reject: locale === "vi" ? "Từ chối" : "Reject",
    },
    results: {
      title: locale === "vi" ? "Kết quả" : "Results",
      empty: locale === "vi" ? "Chưa có kết quả" : "No results yet",
    },
  }), [locale]);
}

export function MobileAppMirror({ style = "ios", locale = "vi" }: { style?: "ios" | "android"; locale?: "vi" | "en" }) {
  const [screen, setScreen] = useState<"command" | "tasks" | "approvals" | "results" | "task-detail">("tasks");
  const [tab, setTab] = useState<"command" | "tasks" | "approvals" | "results">("tasks");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [currentLocale, setCurrentLocale] = useState(locale);
  const t = useLocaleLabels(currentLocale);

  useEffect(() => {
    apiFetch("/api/auth/me")
      .then((json) => {
        if (json.success) { setUser(json.data); setIsLoggedIn(true); }
        else { localStorage.removeItem("token"); }
      })
      .catch(() => {})
      .finally(() => setCheckingAuth(false));
  }, []);

  const handleTab = (key: typeof tab) => {
    setTab(key);
    if (key === "tasks") setScreen("tasks");
    else setScreen(key);
  };

  const handleLogout = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  const isIOS = style === "ios";

  return (
    <div className={`mobile-mirror ${isIOS ? "ios" : "android"}`}>
      <div className="mm-header">
        <span className="mm-brand">IAI Computer</span>
        <div className="mm-header-actions">
          {isLoggedIn && (
            <button className="mm-logout" onClick={handleLogout}>{t.login.logout}</button>
          )}
          <button className="mm-locale" onClick={() => setCurrentLocale((l) => (l === "vi" ? "en" : "vi"))}>
            {currentLocale === "vi" ? "EN" : "VI"}
          </button>
        </div>
      </div>

      {isLoggedIn && (
        <div className="mm-tabs">
          {(["command", "tasks", "approvals", "results"] as const).map((k) => (
            <button
              key={k}
              className={`mm-tab ${tab === k ? "active" : ""}`}
              onClick={() => handleTab(k)}
            >
              {t.tabs[k]}
            </button>
          ))}
        </div>
      )}

      <div className="mm-body">
        {checkingAuth ? (
          <div className="mm-loading">{currentLocale === "vi" ? "Đang tải..." : "Loading..."}</div>
        ) : !isLoggedIn ? (
          <LoginScreenMirror locale={currentLocale} onLoggedIn={(u) => { setUser(u); setIsLoggedIn(true); }} />
        ) : screen === "command" ? (
          <CommandScreenMirror locale={currentLocale} />
        ) : screen === "tasks" ? (
          <TaskListScreenMirror locale={currentLocale} onSelectRun={(id) => { setDetailId(id); setScreen("task-detail"); }} />
        ) : screen === "task-detail" && detailId ? (
          <TaskDetailScreenMirror runId={detailId} locale={currentLocale} onBack={() => setScreen("tasks")} />
        ) : screen === "approvals" ? (
          <ApprovalsScreenMirror locale={currentLocale} />
        ) : screen === "results" ? (
          <ResultsScreenMirror locale={currentLocale} />
        ) : null}
      </div>
    </div>
  );
}

function LoginScreenMirror({ locale, onLoggedIn }: { locale: "vi" | "en"; onLoggedIn: (u: User) => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const t = useLocaleLabels(locale).login;

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (mode === "register") {
        const r = await apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify({ email: email.trim(), name: name.trim(), locale }) });
        if (!r.success) throw new Error(r.error || t.error);
      }
      const json = await apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email: email.trim() }) });
      if (!json.success) throw new Error(json.error || t.error);
      localStorage.setItem("token", json.data.session.token);
      onLoggedIn(json.data.user);
    } catch (err: any) {
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mm-login">
      <h3 className="mm-login-title">{mode === "login" ? t.title : t.registerTitle}</h3>
      <input className="mm-input" type="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} />
      {mode === "register" && (
        <input className="mm-input" type="text" placeholder={t.name} value={name} onChange={(e) => setName(e.target.value)} />
      )}
      {error && <p className="mm-error">{error}</p>}
      <button className="mm-btn-primary" onClick={handleSubmit} disabled={loading}>{mode === "login" ? t.loginBtn : t.registerBtn}</button>
      <button className="mm-link" onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}>
        {mode === "login" ? t.switchRegister : t.switchLogin}
      </button>
    </div>
  );
}

function CommandScreenMirror({ locale }: { locale: "vi" | "en" }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Run | null>(null);
  const [error, setError] = useState("");
  const t = useLocaleLabels(locale).command;

  useEffect(() => {
    apiFetch("/api/products").then((json) => {
      if (json.success) { setProducts(json.data); if (json.data.length) setSelected(json.data[0].id); }
    }).catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!text.trim() || !selected) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const json = await apiFetch("/api/command", { method: "POST", body: JSON.stringify({ text: text.trim(), productId: selected }) });
      if (!json.success) throw new Error(json.error || "Error");
      setResult(json.data.run);
    } catch (err: any) { setError(err.message || "Error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="mm-command">
      <h3 className="mm-section-title">{t.title}</h3>
      <p className="mm-label">{t.product}</p>
      <div className="mm-chip-row">
        {products.map((p) => (
          <button key={p.id} className={`mm-chip ${selected === p.id ? "active" : ""}`} onClick={() => setSelected(p.id)}>{p.name}</button>
        ))}
      </div>
      <textarea className="mm-textarea" rows={4} placeholder={t.placeholder} value={text} onChange={(e) => setText(e.target.value)} />
      {error && <p className="mm-error">{error}</p>}
      {result && (
        <div className="mm-result-card">
          <strong>{t.created}</strong>
          <span className="mm-meta">{result.id}</span>
        </div>
      )}
      <button className="mm-btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? t.sending : t.submit}</button>
    </div>
  );
}

function TaskListScreenMirror({ locale, onSelectRun }: { locale: "vi" | "en"; onSelectRun: (id: string) => void }) {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useLocaleLabels(locale).tasks;

  useEffect(() => {
    apiFetch("/api/runs").then((json) => { if (json.success) setRuns(json.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statusColor = (state: string) => {
    switch (state) {
      case "completed": return "#34d399";
      case "running": return "#2f6bff";
      case "failed": return "#ef4444";
      default: return "#aab4c0";
    }
  };

  return (
    <div className="mm-task-list">
      <h3 className="mm-section-title">{t.title}</h3>
      {runs.length === 0 ? (
        <p className="mm-empty">{loading ? t.loading : t.empty}</p>
      ) : (
        runs.map((r) => (
          <button key={r.id} className="mm-task-card" onClick={() => onSelectRun(r.id)}>
            <div className="mm-task-row">
              <span className="mm-dot" style={{ backgroundColor: statusColor(r.state) }} />
              <span className="mm-task-text">{r.text}</span>
            </div>
            <span className="mm-meta">{r.id} — {r.state}</span>
          </button>
        ))
      )}
    </div>
  );
}

function TaskDetailScreenMirror({ runId, locale, onBack }: { runId: string; locale: "vi" | "en"; onBack: () => void }) {
  const [run, setRun] = useState<Run | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/api/runs/${runId}`).then((json) => { if (json.success) setRun(json.data); }).catch(() => {}).finally(() => setLoading(false));
  }, [runId]);

  return (
    <div className="mm-task-detail">
      <button className="mm-back" onClick={onBack}>{locale === "vi" ? "← Quay lại" : "← Back"}</button>
      {loading ? <p className="mm-empty">Loading...</p> : run ? (
        <div className="mm-task-card">
          <span className="mm-meta">{run.id}</span>
          <p className="mm-task-text">{run.text}</p>
          <span className="mm-badge">{run.state}</span>
        </div>
      ) : <p className="mm-empty">Not found</p>}
    </div>
  );
}

function ApprovalsScreenMirror({ locale }: { locale: "vi" | "en" }) {
  const [items, setItems] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useLocaleLabels(locale).approvals;

  useEffect(() => {
    apiFetch("/api/approvals").then((json) => { if (json.success) setItems(json.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const act = async (id: string, action: "approve" | "reject") => {
    const json = await apiFetch(`/api/approvals/${id}/${action}`, { method: "POST", body: action === "reject" ? JSON.stringify({ reason: "" }) : undefined });
    if (json.success) {
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, state: action === "approve" ? "approved" : "rejected" } : i));
    }
  };

  return (
    <div className="mm-approvals">
      <h3 className="mm-section-title">{t.title}</h3>
      {items.length === 0 ? (
        <p className="mm-empty">{loading ? "Loading..." : t.empty}</p>
      ) : (
        items.map((a) => (
          <div key={a.id} className="mm-approval-card">
            <div className="mm-approval-row">
              <span className="mm-approval-action">{a.action}</span>
              <span className={`mm-badge ${a.state}`}>{a.state}</span>
            </div>
            <span className="mm-meta">{a.resource}</span>
            {a.state === "pending" && (
              <div className="mm-approval-actions">
                <button className="mm-btn-approve" onClick={() => act(a.id, "approve")}>{t.approve}</button>
                <button className="mm-btn-reject" onClick={() => act(a.id, "reject")}>{t.reject}</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

function ResultsScreenMirror({ locale }: { locale: "vi" | "en" }) {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useLocaleLabels(locale).results;

  useEffect(() => {
    apiFetch("/api/runs").then((json) => { if (json.success) setRuns(json.data.filter((r: Run) => r.state === "completed")); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mm-results">
      <h3 className="mm-section-title">{t.title}</h3>
      {runs.length === 0 ? (
        <p className="mm-empty">{loading ? "Loading..." : t.empty}</p>
      ) : (
        runs.map((r) => (
          <div key={r.id} className="mm-result-card">
            <span className="mm-task-text">{r.text}</span>
            <span className="mm-meta">{r.id}</span>
          </div>
        ))
      )}
    </div>
  );
}
