import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface AuthPageProps {
  locale?: "vi" | "en";
  onLogin?: (user: { id: string; email: string; name: string }) => void;
}

async function apiLogin(email: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Login failed");
  return json.data as { user: { id: string; email: string; name: string }; session: { token: string } };
}

async function apiRegister(email: string, name: string, locale: string) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, locale }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Register failed");
  return json.data as { id: string; email: string; name: string };
}

export function LoginPage({ locale = "vi", onLogin }: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "register") {
        await apiRegister(email.trim(), name.trim(), locale);
      }
      const result = await apiLogin(email.trim());
      localStorage.setItem("token", result.session.token);
      onLogin?.(result.user);
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          <h2>{mode === "login" ? (locale === "vi" ? "Đăng nhập" : "Sign in") : (locale === "vi" ? "Đăng ký" : "Sign up")}</h2>
          {error ? <p className="auth-error">{error}</p> : null}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={locale === "vi" ? "email@example.com" : "email@example.com"}
              required
              className="auth-input"
            />
            {mode === "register" && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === "vi" ? "Họ tên" : "Full name"}
                required
                className="auth-input"
              />
            )}
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? "..." : mode === "login" ? (locale === "vi" ? "Đăng nhập" : "Sign in") : (locale === "vi" ? "Đăng ký" : "Sign up")}
            </button>
          </form>
          <button type="button" className="auth-switch" onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}>
            {mode === "login" ? (locale === "vi" ? "Chưa có tài khoản? Đăng ký" : "No account? Sign up") : (locale === "vi" ? "Đã có tài khoản? Đăng nhập" : "Have an account? Sign in")}
          </button>
        </div>
      </div>
    </section>
  );
}
