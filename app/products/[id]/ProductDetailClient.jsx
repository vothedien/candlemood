"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, Clock, Flame, Lightbulb, Music2, ShoppingBag, Sparkles, Star } from "lucide-react";
import { useCart } from "../../context/cart-context";
import { moodFilters } from "../../lib/catalog";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export default function ProductDetailClient({ product, relatedProducts }) {
  const { addItem, totalItems } = useCart();

  const moodLabel = useMemo(
    () => moodFilters.find(m => m.key === product.mood)?.label ?? "Đa mood",
    [product.mood],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-amber-50">
      <header className="border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
            <Flame className="text-amber-400" size={20} /> MoodCandle
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-amber-200/80 hover:border-amber-400/60 hover:text-amber-100"
            >
              <ArrowLeft size={16} /> Quay lại danh mục
            </Link>
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
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-indigo-500/20 p-6">
              {product.badge && (
                <span className="absolute left-6 top-6 inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-zinc-950">
                  <Sparkles size={14} /> {product.badge}
                </span>
              )}
              <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-tr from-amber-400/30 via-rose-400/30 to-indigo-400/30" />
            </div>

            <section className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
              <h2 className="text-lg font-semibold text-amber-100">Nốt hương chính</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.notes.map(note => (
                  <span
                    key={note}
                    className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-900/20 px-3 py-1 text-xs text-amber-50"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
              <h2 className="text-lg font-semibold text-amber-100">Ritual gợi ý</h2>
              <ul className="mt-3 space-y-2 text-sm text-amber-200/80">
                {product.rituals.map(step => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center rounded-full bg-amber-500/15 px-3 py-1 text-xs text-amber-200/80">Mood: {moodLabel}</span>
                  <h1 className="mt-3 text-3xl font-semibold text-amber-50">{product.name}</h1>
                </div>
                <div className="flex items-center gap-1 text-sm text-amber-200/80">
                  <Star size={18} className="fill-amber-400 text-amber-400" />
                  {product.rating.toFixed(2)}
                </div>
              </div>
              <p className="mt-4 text-sm text-amber-200/85">{product.description}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-sm text-amber-200/80">
                  <ShoppingBag size={18} className="text-amber-300" />
                  <div>
                    <div className="text-xs uppercase text-amber-200/70">Giá</div>
                    <div className="text-lg font-semibold text-amber-100">{product.priceDisplay}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-sm text-amber-200/80">
                  <Clock size={18} className="text-amber-300" />
                  <div>
                    <div className="text-xs uppercase text-amber-200/70">Thời gian cháy</div>
                    <div className="text-lg font-semibold text-amber-100">{product.burnTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-sm text-amber-200/80">
                  <Lightbulb size={18} className="text-amber-300" />
                  <div>
                    <div className="text-xs uppercase text-amber-200/70">Hiệu ứng LED</div>
                    <div className="text-sm font-medium text-amber-100">{product.ledEffect}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-sm text-amber-200/80">
                  <Music2 size={18} className="text-amber-300" />
                  <div>
                    <div className="text-xs uppercase text-amber-200/70">Playlist gợi ý</div>
                    <div className="text-sm font-medium text-amber-100">QR kèm theo hộp nến</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => addItem(product)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-base font-semibold text-zinc-900 transition hover:bg-amber-300"
                >
                  <ShoppingBag size={18} /> Thêm vào giỏ
                </button>
                <p className="text-xs text-amber-200/70">
                  Giao trong ngày tại TP.HCM · Có sẵn tùy chọn gói quà.
                </p>
              </div>
            </div>

            {relatedProducts.length > 0 && (
              <section className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
                <h2 className="text-lg font-semibold text-amber-100">Gợi ý cùng mood</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {relatedProducts.map(item => (
                    <div key={item.id} className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-amber-50">{item.name}</h3>
                          <p className="text-xs text-amber-200/70">{item.summary}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-amber-200/70">
                          <Star size={14} className="fill-amber-400 text-amber-400" />
                          {item.rating.toFixed(2)}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-amber-200/80">
                        <span>{item.priceDisplay}</span>
                        <Link
                          href={`/products/${item.id}`}
                          className="text-xs font-medium text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
                        >
                          Xem nhanh
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
}
