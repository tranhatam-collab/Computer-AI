import { useState } from "react";

interface AuthPageProps {
  locale?: "vi" | "en";
  onLogin?: (email: string) => void;
}

export function LoginPage({ locale = "vi", onLogin }: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onLogin?.(email);
  };

  if (submitted) {
    return (
      <section className="auth-page">
        <div className="container auth-container">
          <div className="auth-card">
            <h2>{locale === "vi" ? "Kiểm tra email" : "Check your email"}</h2>
            <p>{locale === "vi" ? `Chúng tôi đã gửi magic link đến ${email}.` : `We've sent a magic link to ${email}.`}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          <h2>{locale === "vi" ? "Đăng nhập" : "Sign in"}</h2>
          <p className="auth-subtitle">
            {locale === "vi" ? "Nhập email để nhận magic link." : "Enter your email to receive a magic link."}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={locale === "vi" ? "email@example.com" : "email@example.com"}
              required
              className="auth-input"
            />
            <button type="submit" className="btn btn-primary auth-btn">
              {locale === "vi" ? "Gửi magic link" : "Send magic link"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
