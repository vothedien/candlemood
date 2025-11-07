"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Flame, Loader2, LockKeyhole } from "lucide-react";
import { useAuth } from "../../context/auth-context";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-md px-4 sm:px-0 ${className}`}>{children}</div>
);

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get("redirect") || "/products";

  const handleSubmit = event => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = login({ email, password });
    setLoading(false);

    if (!result?.success) {
      setError(result?.message || "Không thể đăng nhập. Vui lòng thử lại.");
      return;
    }

    router.push(redirectTo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-amber-50">
      <header className="border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
            <Flame className="text-amber-400" size={20} /> MoodCandle
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-amber-200/80 transition hover:border-amber-400/60 hover:text-amber-100"
          >
            <ArrowLeft size={14} /> Về trang chủ
          </Link>
        </div>
      </header>

      <main className="py-12 sm:py-16">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8">
            <div className="flex items-center gap-3 text-sm text-amber-200/70">
              <LockKeyhole size={18} className="text-amber-300" />
              <span>Vui lòng đăng nhập để tiếp tục thanh toán và quản lý giỏ hàng.</span>
            </div>

            <h1 className="mt-6 text-2xl font-semibold text-amber-50">Đăng nhập</h1>
            <p className="mt-2 text-sm text-amber-200/80">
              Chưa có tài khoản? {" "}
              <Link href={`/auth/register?redirect=${encodeURIComponent(redirectTo)}`} className="text-amber-300 underline-offset-4 hover:underline">
                Đăng ký ngay
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-amber-100/90">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-amber-50 placeholder:text-amber-200/40 focus:border-amber-400/60 focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-amber-100/90">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-amber-50 placeholder:text-amber-200/40 focus:border-amber-400/60 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
}
