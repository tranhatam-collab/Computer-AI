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

async function apiMagicLink(email: string, locale: string) {
  const res = await fetch(`${API_BASE}/api/auth/magic-link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, locale }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to send code");
}

async function apiVerifyOtp(email: string, code: string) {
  const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Invalid code");
  return json.data as { user: { id: string; email: string; name: string }; session: { token: string } };
}

export function LoginPage({ locale = "vi", onLogin }: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [mode, setMode] = useState<"login" | "register" | "magic-link" | "verify-otp">("login");
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

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiMagicLink(email.trim(), locale);
      setMode("verify-otp");
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await apiVerifyOtp(email.trim(), otp.trim());
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
          {mode === "verify-otp" ? (
            <>
              <h2>{locale === "vi" ? "Nhập mã OTP" : "Enter OTP"}</h2>
              {error ? <p className="auth-error">{error}</p> : null}
              <form onSubmit={handleVerifyOtp}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder={locale === "vi" ? "123456" : "123456"}
                  required
                  maxLength={6}
                  className="auth-input"
                />
                <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                  {loading ? "..." : locale === "vi" ? "Xác nhận" : "Verify"}
                </button>
              </form>
              <button type="button" className="auth-switch" onClick={() => setMode("magic-link")}>
                {locale === "vi" ? "Gửi lại mã" : "Resend code"}
              </button>
            </>
          ) : mode === "magic-link" ? (
            <>
              <h2>{locale === "vi" ? "Đăng nhập bằng email" : "Sign in with email"}</h2>
              {error ? <p className="auth-error">{error}</p> : null}
              <form onSubmit={handleMagicLink}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === "vi" ? "email@example.com" : "email@example.com"}
                  required
                  className="auth-input"
                />
                <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                  {loading ? "..." : locale === "vi" ? "Gửi mã OTP" : "Send OTP"}
                </button>
              </form>
              <button type="button" className="auth-switch" onClick={() => setMode("login")}>
                {locale === "vi" ? "Đăng nhập bằng mật khẩu" : "Password sign in"}
              </button>
            </>
          ) : (
            <>
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
              <div className="auth-links">
                <button type="button" className="auth-switch" onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}>
                  {mode === "login" ? (locale === "vi" ? "Chưa có tài khoản? Đăng ký" : "No account? Sign up") : (locale === "vi" ? "Đã có tài khoản? Đăng nhập" : "Have an account? Sign in")}
                </button>
                {mode === "login" && (
                  <button type="button" className="auth-switch" onClick={() => setMode("magic-link")}>
                    {locale === "vi" ? "Đăng nhập bằng OTP" : "Sign in with OTP"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
