"use client";

import Link from "next/link";
import { LogOut, UserPlus, UserRound } from "lucide-react";
import { useAuth } from "../context/auth-context";

export default function AccountControls({ className = "" }) {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/50 px-3 py-1.5 text-xs font-medium text-amber-100/90">
          <UserRound size={14} className="text-amber-300" />
          {user.name || user.email}
        </span>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-amber-200/80 transition hover:border-rose-400/60 hover:text-amber-50"
        >
          <LogOut size={14} /> Đăng xuất
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-amber-200/85 transition hover:border-amber-400/60 hover:text-amber-50"
      >
        <UserRound size={14} /> Đăng nhập
      </Link>
      <Link
        href="/auth/register"
        className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-semibold text-zinc-900 transition hover:bg-amber-300"
      >
        <UserPlus size={14} /> Đăng ký
      </Link>
    </div>
  );
}
