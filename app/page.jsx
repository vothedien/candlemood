"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Moon, Sparkles, Flame, Play, Palette, ShoppingBag, Leaf, Smartphone, Timer, Music, MapPin, Store } from "lucide-react";
import { useCart } from "./context/cart-context";
import AccountControls from "./components/account-controls";
import { getMoodSuggestion } from "./lib/catalog";

// --- Helper components ------------------------------------------------------
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const SectionTitle = ({ kicker, title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto">
    {kicker && (
      <div className="uppercase tracking-widest text-xs font-semibold text-amber-300/80 mb-2">
        {kicker}
      </div>
    )}
    <h2 className="text-3xl sm:text-4xl font-semibold text-amber-50 leading-tight">{title}</h2>
    {subtitle && (
      <p className="text-amber-200/80 mt-3 leading-relaxed">{subtitle}</p>
    )}
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-900/20 px-3 py-1 text-amber-100 text-xs">
    {children}
  </span>
);

// --- Mock product data ------------------------------------------------------
const products = [
  {
    id: "starter-standard",
    name: "MoodCandle Standard Set",
    tier: "Standard",
    price: "89k – 99k",
    priceDisplay: "99.000đ",
    priceValue: 99000,
    features: [
      { icon: <Music size={16} />, text: "QR playlist theo mood" },
      { icon: <Leaf size={16} />, text: "Sáp đậu nành hữu cơ" },
      { icon: <Flame size={16} />, text: "Bấc cotton / gỗ" },
    ],
    cta: "Thêm vào giỏ",
    mood: "relax",
  },
  {
    id: "smart-pro",
    name: "MoodCandle Smart Pro",
    tier: "Smart",
    price: "349k – 449k",
    priceDisplay: "449.000đ",
    priceValue: 449000,
    highlight: true,
    features: [
      { icon: <Smartphone size={16} />, text: "App điều khiển màu LED" },
      { icon: <Moon size={16} />, text: "Tự nhận diện cảm xúc" },
      { icon: <Timer size={16} />, text: "Hẹn giờ Thiền & Ngủ" },
      { icon: <Palette size={16} />, text: "Đổi màu theo mood" },
    ],
    cta: "Mua bản Smart",
    mood: "all",
  },
];

// --- Candle visual ----------------------------------------------------------
const Candle = () => (
  <div className="relative w-56 h-72 sm:w-64 sm:h-80 mx-auto">
    {/* Glass */}
    <div className="absolute inset-x-4 bottom-0 h-3/4 rounded-b-xl rounded-t-lg bg-gradient-to-t from-amber-200/30 via-amber-100/10 to-transparent backdrop-blur-sm border border-white/10 shadow-2xl" />
    {/* Wax gradient */}
    <div className="absolute inset-x-6 bottom-2 h-2/3 rounded-t-lg bg-gradient-to-t from-amber-400 via-rose-400 to-indigo-400 blur-[1px] opacity-90" />
    {/* Flame */}
    <div className="absolute left-1/2 -translate-x-1/2 top-6">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: [0.95, 1.02, 0.95] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-6 h-9 bg-gradient-to-t from-amber-300 via-amber-200 to-white rounded-full shadow-[0_0_30px_8px_rgba(251,191,36,0.55)]"
      />
    </div>
    {/* Glow */}
    <div className="absolute -inset-x-10 -bottom-6 h-40 bg-amber-500/20 blur-3xl rounded-full" />
  </div>
);

// --- Mood Quiz mock ---------------------------------------------------------
const moods = [
  { key: "relaxed", label: "Thư giãn" },
  { key: "focus", label: "Tập trung" },
  { key: "cheerful", label: "Vui vẻ" },
  { key: "sleep", label: "Ngủ ngon" },
];

function QuizModal({ open, onClose, onFinish }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-xl rounded-2xl bg-zinc-900 border border-white/10 p-6 text-amber-50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Mood Quiz</h3>
          <button onClick={onClose} className="text-amber-200/70 hover:text-amber-100">✕</button>
        </div>

        {step === 0 && (
          <div>
            <p className="text-amber-200/80 mb-4">Hôm nay bạn muốn cảm xúc của mình ở trạng thái nào?</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {moods.map(m => (
                <button
                  key={m.key}
                  onClick={() => setSelected(m)}
                  className={`rounded-xl border px-3 py-3 text-sm transition ${
                    selected?.key === m.key
                      ? "border-amber-400 bg-amber-900/20"
                      : "border-white/10 hover:border-amber-300/40"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/10">Hủy</button>
              <button
                disabled={!selected}
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-lg bg-amber-400 text-zinc-900 font-semibold disabled:opacity-50"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-amber-200/90 mb-4">Gợi ý cho bạn:</p>
            <div className="rounded-xl border border-white/10 p-4 bg-zinc-800/40">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-indigo-400" />
                <div>
                  <div className="font-semibold">MoodCandle {selected?.label}</div>
                  <div className="text-sm text-amber-200/80">Hương gợi ý: Lavender · Cedarwood · Vanilla</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-amber-200/80">
                LED đổi màu tự động theo {selected?.label.toLowerCase()} · Playlist Spotify kèm mã QR.
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/10">Để sau</button>
              <button onClick={() => { onFinish?.(selected); onClose(); }} className="px-4 py-2 rounded-lg bg-amber-400 text-zinc-900 font-semibold">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// --- Page -------------------------------------------------------------------
export default function MoodCandleLanding() {
  const [quizOpen, setQuizOpen] = useState(false);
  const router = useRouter();
  const { addItem, totalItems } = useCart();

  const addTierProductToCart = product => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.priceValue,
      priceDisplay: product.priceDisplay ?? product.price,
      mood: product.mood,
    });
  };

  const handleQuizFinish = selectedMood => {
    if (!selectedMood) return;
    const suggestion = getMoodSuggestion(selectedMood.key);
    if (suggestion) {
      addItem(suggestion);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-amber-50 selection:bg-amber-300 selection:text-zinc-900">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
        <Container className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-semibold">
            <img src="/candlelogo.png" alt="MoodCandle logo" className="w-20 h-20 object-contain" /> MoodCandle
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-amber-200/80">
            <a href="#how" className="hover:text-amber-100">How it works</a>
            <a href="products" className="hover:text-amber-100">Sản phẩm</a>
            <a href="#gallery" className="hover:text-amber-100">Cộng đồng</a>
            <a href="#pickup" className="hover:text-amber-100">Pick‑up</a>
          </nav>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <button onClick={() => setQuizOpen(true)} className="hidden sm:inline-flex items-center gap-2 rounded-full border border-amber-400/30 px-3 py-1.5 text-sm hover:border-amber-400/60">
              <Sparkles size={16} /> Mood Quiz
            </button>
            <AccountControls />
            <Link
              href="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-amber-400 text-zinc-900 px-3 py-1.5 text-sm font-semibold"
            >
              <ShoppingBag size={16} /> Giỏ hàng
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-5 min-w-[20px] rounded-full bg-rose-500 text-white text-[10px] grid place-items-center px-1">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -inset-x-40 -top-32 h-96 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.15),rgba(0,0,0,0)_60%)]" />
        <Container className="grid lg:grid-cols-2 gap-10 py-16 lg:py-24 items-center">
          <div>
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-semibold leading-tight"
            >
              Thắp hương, <span className="text-amber-300">chạm cảm xúc</span>.
            </motion.h1>
            <p className="mt-4 text-amber-200/85 max-w-xl">
              “Nến biết lắng nghe” – kết hợp sáp đậu nành hữu cơ, LED đổi màu và QR playlist nhạc. Tự động gợi ý hương & ánh sáng theo cảm xúc của bạn.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={() => setQuizOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-zinc-900 font-semibold">
                <Sparkles size={18} /> Bắt đầu Mood Quiz
              </button>
              <a href="#products" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3">
                <Play size={18} /> Xem sản phẩm
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill><Leaf size={14} /> Sáp đậu nành hữu cơ</Pill>
              <Pill><Palette size={14} /> LED đổi màu</Pill>
              <Pill><Music size={14} /> QR Playlist</Pill>
            </div>
          </div>

          <div className="relative">
            <Candle />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 lg:py-24 border-t border-white/10 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <Container>
          <SectionTitle kicker="How it works" title="Kén 3 giác quan · Cozy Tech" subtitle="Khứu giác – Thính giác – Thị giác hoà quyện trong một trải nghiệm thư giãn thụ động." />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[{
              icon: <Leaf className="text-amber-300" />, title: "Mùi hương", desc: "Sáp đậu nành hữu cơ, hương liệu an toàn."
            },{
              icon: <Music className="text-amber-300" />, title: "Âm thanh", desc: "QR dẫn playlist Spotify/YouTube theo mood."
            },{
              icon: <Palette className="text-amber-300" />, title: "Ánh sáng", desc: "LED đổi màu tự động theo cảm xúc."
            }].map((b, i) => (
              <motion.div key={i} initial={{ y: 12, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-white/10 p-6 bg-zinc-900/40">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-amber-500/15 mb-4">{b.icon}</div>
                <div className="font-semibold mb-1">{b.title}</div>
                <p className="text-sm text-amber-200/80">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Products */}
      <section id="products" className="py-16 lg:py-24">
        <Container>
          <SectionTitle kicker="Sản phẩm" title="Chọn nến theo tâm trạng của bạn" subtitle="Hai phân khúc giá · chuẩn O2O – mua online hoặc nhận tại cửa hàng." />
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {products.map((p, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => router.push("/products")}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    router.push("/products");
                  }
                }}
                className={`rounded-2xl p-6 border bg-zinc-900/40 transition cursor-pointer hover:border-amber-400/60 hover:bg-zinc-900/60 focus:outline-none focus:ring-2 focus:ring-amber-400/40 ${
                  p.highlight ? "border-amber-400/40" : "border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{p.tier}</div>
                  {p.highlight && <span className="text-xs px-2 py-1 rounded-full bg-amber-400 text-zinc-900 font-semibold">Bán chạy</span>}
                </div>
                <div className="mt-1 text-2xl font-semibold text-amber-200">{p.price}</div>
                <div className="mt-4 grid gap-2">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-amber-200/85">
                      <span className="h-6 w-6 grid place-items-center rounded-md bg-amber-500/15">{f.icon}</span>
                      {f.text}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={event => {
                      event.stopPropagation();
                      addTierProductToCart(p);
                    }}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold ${
                      p.highlight ? "bg-amber-400 text-zinc-900" : "border border-white/10"
                    }`}
                  >
                    <ShoppingBag size={16} /> {p.cta}
                  </button>
                  <button
                    onClick={event => {
                      event.stopPropagation();
                      setQuizOpen(true);
                    }}
                    className="text-sm underline underline-offset-4 text-amber-200/80 hover:text-amber-100"
                  >
                    Dùng thử Mood Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Community gallery (placeholders) */}
      <section id="gallery" className="py-16 lg:py-24 border-t border-white/10 bg-zinc-900/40">
        <Container>
          <SectionTitle kicker="Community" title="Hài phúc từ khách hàng" subtitle="Khoảnh khắc thư giãn do cộng đồng chia sẻ." />
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-xl bg-gradient-to-tr from-amber-400/20 via-rose-400/20 to-indigo-400/20 border border-white/10" />
            ))}
          </div>
        </Container>
      </section>

      {/* Pick-up banner */}
      <section id="pickup" className="py-10">
        <Container>
          <div className="rounded-2xl border border-amber-400/30 bg-amber-900/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-amber-500/15 text-amber-300">
                <Store />
              </div>
              <div>
                <div className="font-semibold">Buy Online, Pick‑up in Store</div>
                <div className="text-sm text-amber-100/80 flex items-center gap-2"><MapPin size={14}/> Q1 · Q3 · Thảo Điền (TP.HCM)</div>
              </div>
            </div>
            <a href="#" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-zinc-900 font-semibold">Đặt & nhận tại cửa hàng</a>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="pt-10 pb-16 border-t border-white/10">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2 font-semibold"><img src="/candlelogo.png" alt="MoodCandle logo" className="w-20 h-20 object-contain" /> MoodCandle</div>
            <div className="text-sm text-amber-200/70">

              © {new Date().getFullYear()} MoodCandle · &ldquo;Thắp hương, chạm cảm xúc.&rdquo;
            </div>
          </div>
        </Container>
      </footer>

      <QuizModal
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        onFinish={handleQuizFinish}
      />
    </div>
  );
}
