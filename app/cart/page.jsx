"use client";

import Link from "next/link";
import { ArrowLeft, Flame, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/cart-context";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const formatCurrency = value => `${Math.round(value).toLocaleString("vi-VN")}đ`;

export default function CartPage() {
  const { items, addItem, decrementItem, removeItem, clearCart, totalItems, totalCost } = useCart();
  const hasItems = items.length > 0;

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
              <ArrowLeft size={16} /> Tiếp tục mua sắm
            </Link>
            {hasItems && (
              <button
                onClick={clearCart}
                className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 px-3 py-1.5 text-sm text-rose-200/90 transition hover:border-rose-400 hover:text-rose-100"
              >
                <Trash2 size={16} /> Xóa giỏ hàng
              </button>
            )}
          </div>
        </Container>
      </header>

      <main className="py-12 sm:py-16">
        <Container className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-amber-50">Giỏ hàng của bạn</h1>
            <p className="mt-2 text-sm text-amber-200/80">
              {hasItems
                ? `${totalItems} sản phẩm · Tổng tạm tính ${formatCurrency(totalCost)}`
                : "Chưa có sản phẩm nào trong giỏ. Thêm nến để bắt đầu mood của bạn nhé!"}
            </p>
          </div>

          {hasItems ? (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-zinc-900/60 p-5 transition hover:border-amber-400/40"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm uppercase tracking-[0.3em] text-amber-200/60">Mood {item.mood ?? "mix"}</div>
                      <h2 className="mt-2 text-xl font-semibold text-amber-50">{item.name}</h2>
                      <div className="mt-1 text-sm text-amber-200/80">
                        Đơn giá {item.priceDisplay ?? formatCurrency(item.price ?? 0)}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1.5 text-sm text-amber-100">
                        <button
                          onClick={() => decrementItem(item.id)}
                          className="rounded-full border border-white/10 p-1 hover:border-amber-300/40 hover:text-amber-100"
                          aria-label="Giảm số lượng"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-[32px] text-center text-base font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => addItem(item)}
                          className="rounded-full border border-white/10 p-1 hover:border-amber-300/40 hover:text-amber-100"
                          aria-label="Tăng số lượng"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-sm font-semibold text-amber-100">
                        {formatCurrency((item.price ?? 0) * item.quantity)}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-rose-300 underline-offset-4 hover:text-rose-200 hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-amber-300" />
              <p className="mt-4 text-sm text-amber-200/80">
                Bạn chưa thêm sản phẩm nào. Khám phá danh mục nến để tìm mood phù hợp nhé!
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-zinc-900"
              >
                Bắt đầu mua sắm
              </Link>
            </div>
          )}

          {hasItems && (
            <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-amber-200/60">Tạm tính</div>
                  <div className="text-2xl font-semibold text-amber-50">{formatCurrency(totalCost)}</div>
                  <p className="mt-1 text-xs text-amber-200/70">Đã bao gồm gói playlist QR và LED đổi màu.</p>
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-base font-semibold text-zinc-900 transition hover:bg-amber-300">
                  Hoàn tất đơn hàng
                </button>
              </div>
            </section>
          )}
        </Container>
      </main>
    </div>
  );
}
