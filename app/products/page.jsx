"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Filter, Flame, ShoppingBag, Star } from "lucide-react";
import { useCart } from "../context/cart-context";
import { moodFilters, productCatalog } from "../lib/catalog";
import AccountControls from "../components/account-controls";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export default function ProductsPage() {
  const [activeMood, setActiveMood] = useState("all");
  const { addItem, totalItems } = useCart();

  const filteredCatalog = useMemo(() => {
    if (activeMood === "all") return productCatalog;
    return productCatalog.filter(item => item.mood === activeMood || item.mood === "all");
  }, [activeMood]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-amber-50">
      <header className="border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
            <Flame className="text-amber-400" size={20} /> MoodCandle
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-amber-200/80 hover:border-amber-400/60 hover:text-amber-100"
            >
              <ArrowLeft size={16} /> Về trang chủ
            </Link>
            <AccountControls />
            <Link
              href="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-1.5 text-sm font-semibold text-zinc-900"
            >
              <ShoppingBag size={16} /> Giỏ hàng
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-rose-500 px-1 text-[10px] text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </Container>
      </header>

      <main className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="uppercase text-xs tracking-[0.35em] text-amber-200/70">Mood catalog</div>
              <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-amber-50">Danh mục nến cảm xúc</h1>
              <p className="mt-2 max-w-2xl text-sm text-amber-200/80">
                Lướt qua bộ sưu tập nến thơm MoodCandle với nhiều tone hương và hiệu ứng ánh sáng khác nhau – lấy cảm hứng từ trải nghiệm mua sắm kiểu Shopee nhưng tinh gọn và sang trọng hơn.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-white/10 bg-zinc-900/40 px-3 py-1.5 text-xs text-amber-200/80">
              <Filter size={14} /> Lọc theo mood
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {moodFilters.map(mood => (
              <button
                key={mood.key}
                onClick={() => setActiveMood(mood.key)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  activeMood === mood.key
                    ? "border-amber-400 bg-amber-900/30 text-amber-100"
                    : "border-white/10 text-amber-200/70 hover:border-amber-300/40 hover:text-amber-100"
                }`}
              >
                {mood.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCatalog.map(product => (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-5 transition hover:border-amber-400/50 hover:bg-zinc-900/70"
              >
                {product.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-zinc-950">
                    {product.badge}
                  </span>
                )}
                <div className="h-40 w-full rounded-xl bg-gradient-to-tr from-amber-400/20 via-rose-400/20 to-indigo-400/20" />
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-amber-50 group-hover:text-amber-300">{product.name}</h2>
                    <p className="mt-1 text-sm text-amber-200/80">{product.summary}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-200/70">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    {product.rating.toFixed(2)}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-amber-200">{product.priceDisplay}</span>
                  <div className="flex items-center gap-2 text-xs text-amber-200/70">
                    Mood: <span className="rounded-full bg-amber-500/10 px-2 py-0.5">{moodFilters.find(m => m.key === product.mood)?.label ?? "Đa mood"}</span>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={() => addItem(product)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-amber-300"
                  >
                    <ShoppingBag size={16} /> Thêm vào giỏ
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    onClick={event => event.stopPropagation()}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm text-amber-100/90 transition hover:border-amber-400/60 hover:text-amber-50"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
