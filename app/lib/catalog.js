export const moodFilters = [
  { key: "all", label: "Tất cả" },
  { key: "relax", label: "Thư giãn" },
  { key: "focus", label: "Tập trung" },
  { key: "sleep", label: "Ngủ ngon" },
  { key: "cheerful", label: "Vui vẻ" },
];

export const productCatalog = [
  {
    id: "relax-lavender",
    name: "MoodCandle Relax Lavender",
    summary: "Lavender · Vanilla · LED vàng ấm",
    description:
      "Công thức thư giãn quốc dân kết hợp lavender Provence và vanilla dịu, ánh sáng vàng ấm giúp cơ thể thả lỏng sau ngày dài.",
    price: 99000,
    priceDisplay: "99.000đ",
    mood: "relax",
    rating: 4.9,
    badge: "Bán chạy",
    notes: ["Lavender", "Vanilla", "Musk nhẹ"],
    rituals: [
      "Thắp nến 30 phút trước khi ngủ để xoa dịu tinh thần.",
      "Bật playlist \"Evening Unwind\" qua mã QR đi kèm.",
      "Đặt cạnh giường hoặc góc sofa để tận hưởng mùi hương dịu nhẹ.",
    ],
    ledEffect: "Ánh vàng 2700K mô phỏng ánh hoàng hôn.",
    burnTime: "40 – 45 giờ",
  },
  {
    id: "focus-cedar",
    name: "MoodCandle Focus Cedarwood",
    summary: "Cedarwood · Rosemary · Ánh sáng trắng",
    description:
      "Mùi gỗ tuyết tùng pha thảo mộc rosemary giúp đầu óc tỉnh táo. Ánh sáng trắng mát kích thích tập trung cho giờ làm việc.",
    price: 109000,
    priceDisplay: "109.000đ",
    mood: "focus",
    rating: 4.8,
    notes: ["Cedarwood", "Rosemary", "Peppermint"],
    rituals: [
      "Đốt khi cần bơm năng lượng làm việc buổi sáng.",
      "Kết hợp danh sách nhạc \"Deep Focus\" được in trên QR.",
    ],
    ledEffect: "Ánh sáng trắng 4000K nâng cao sự tỉnh táo.",
    burnTime: "38 – 42 giờ",
  },
  {
    id: "sleep-chamomile",
    name: "MoodCandle Sleep Chamomile",
    summary: "Chamomile · Sandalwood · LED tím dịu",
    description:
      "Hương hoa cúc Chamomile đan cùng gỗ đàn hương mang tới cảm giác êm ái, hỗ trợ giấc ngủ sâu với ánh sáng tím dịu.",
    price: 105000,
    priceDisplay: "105.000đ",
    mood: "sleep",
    rating: 4.7,
    notes: ["Chamomile", "Sandalwood", "Lavandin"],
    rituals: [
      "Thắp nến 20 phút trước khi tắt đèn.",
      "Tập vài động tác hít thở theo gợi ý trong QR card đi kèm.",
    ],
    ledEffect: "LED tím pastel êm dịu.",
    burnTime: "42 giờ",
  },
  {
    id: "cheerful-citrus",
    name: "MoodCandle Cheerful Citrus",
    summary: "Cam Bergamot · Neroli · LED cam",
    description:
      "Tươi sáng với cam Bergamot và hoa cam Neroli. Ánh cam rực rỡ kích hoạt năng lượng tích cực ngay khi bạn châm nến.",
    price: 102000,
    priceDisplay: "102.000đ",
    mood: "cheerful",
    rating: 4.85,
    notes: ["Bergamot", "Neroli", "Yuzu"],
    rituals: [
      "Thắp vào sáng cuối tuần để khởi động mood vui vẻ.",
      "Phối playlist \"Sunday Bloom\" dành riêng cho dòng Cheerful.",
    ],
    ledEffect: "LED cam coral đầy sức sống.",
    burnTime: "40 giờ",
  },
  {
    id: "smart-pro",
    name: "MoodCandle Smart Pro",
    summary: "Điều khiển app · LED RGB · QR playlist",
    description:
      "Phiên bản smart kết nối app: chọn màu LED, hẹn giờ và đồng bộ nhạc theo cảm xúc. Tất cả trong một chiếc nến thông minh.",
    price: 449000,
    priceDisplay: "449.000đ",
    mood: "all",
    rating: 4.95,
    badge: "Phiên bản Smart",
    notes: ["Sáp đậu nành hữu cơ", "LED RGB", "Playlist cá nhân hóa"],
    rituals: [
      "Tạo routine ánh sáng – âm nhạc theo lịch app.",
      "Đặt chế độ thiền 15 phút với tiếng suối và hương gỗ.",
    ],
    ledEffect: "LED RGB đổi màu theo nhịp nhạc.",
    burnTime: "60 giờ",
  },
  {
    id: "relax-rose",
    name: "MoodCandle Relax Rosewood",
    summary: "Rosewood · Musk · Ánh sáng hồng",
    description:
      "Gỗ hồng mộc và musk thanh làm dịu tâm trạng buổi tối, phù hợp cho những phút tự chăm sóc bản thân (self-care).",
    price: 115000,
    priceDisplay: "115.000đ",
    mood: "relax",
    rating: 4.82,
    notes: ["Rosewood", "Musk", "Amber"],
    rituals: ["Bật chế độ \"Self-love\" trong QR playlist.", "Đặt cạnh góc skincare để tăng mood thư giãn."],
    ledEffect: "LED hồng blush đầy nữ tính.",
    burnTime: "43 giờ",
  },
  {
    id: "focus-matcha",
    name: "MoodCandle Focus Matcha",
    summary: "Matcha · Gừng · Ánh sáng xanh",
    description:
      "Hương matcha ấm kết hợp gừng cay nhẹ giúp tỉnh táo. Ánh sáng xanh lá nâng cao sự tập trung nhẹ nhàng.",
    price: 119000,
    priceDisplay: "119.000đ",
    mood: "focus",
    rating: 4.76,
    notes: ["Matcha", "Gừng", "Lemongrass"],
    rituals: [
      "Đốt trong các buổi brainstorming hoặc học bài.",
      "Nghe playlist \"Matcha Productivity\".",
    ],
    ledEffect: "LED xanh lá dịu mắt.",
    burnTime: "39 giờ",
  },
  {
    id: "sleep-amber",
    name: "MoodCandle Sleep Amber",
    summary: "Amber · Hoắc hương · LED tím",
    description:
      "Tông amber ấm ôm trọn khứu giác, hòa cùng hoắc hương để đưa cơ thể vào trạng thái thư thái chuẩn bị ngủ sâu.",
    price: 112000,
    priceDisplay: "112.000đ",
    mood: "sleep",
    rating: 4.81,
    notes: ["Amber", "Patchouli", "Tonka"],
    rituals: [
      "Thắp kết hợp với liệu trình đọc sách trước khi ngủ.",
      "Nghe playlist \"Deep Sleep Stories\" qua QR.",
    ],
    ledEffect: "LED tím đậm tăng chiều sâu thị giác.",
    burnTime: "44 giờ",
  },
  {
    id: "cheerful-berry",
    name: "MoodCandle Cheerful Berry",
    summary: "Berry · Magnolia · LED hồng",
    description:
      "Ngọt ngào trái mọng berry và hoa mộc lan, tông hồng ngọt giúp mood thêm rộn ràng trong các buổi tụ tập bạn bè.",
    price: 108000,
    priceDisplay: "108.000đ",
    mood: "cheerful",
    rating: 4.74,
    notes: ["Berry", "Magnolia", "Lotus"],
    rituals: [
      "Thắp trong các buổi tiệc trà chiều.",
      "Chia sẻ QR playlist \"Berry Vibes\" với bạn bè.",
    ],
    ledEffect: "LED hồng neon đáng yêu.",
    burnTime: "37 giờ",
  },
  {
    id: "cheerful-peony",
    name: "MoodCandle Cheerful Peony",
    summary: "Peony · Lê chín · LED cầu vồng",
    description:
      "Hương peony sang trọng kết hợp vị ngọt lê chín, LED chuyển màu cầu vồng mang lại cảm giác lễ hội.",
    price: 118000,
    priceDisplay: "118.000đ",
    mood: "cheerful",
    rating: 4.79,
    notes: ["Peony", "Pear", "Freesia"],
    rituals: [
      "Thắp trong dịp mừng sinh nhật hoặc lễ kỷ niệm.",
      "Bật chế độ \"Rainbow Party\" trong app.",
    ],
    ledEffect: "LED chuyển màu cầu vồng mềm mại.",
    burnTime: "41 giờ",
  },
  {
    id: "relax-forest",
    name: "MoodCandle Relax Forest",
    summary: "Thông xanh · Xô thơm · LED xanh lá",
    description:
      "Mang mùi rừng thông vào không gian sống với tông xanh mát, lý tưởng cho người yêu thiên nhiên.",
    price: 120000,
    priceDisplay: "120.000đ",
    mood: "relax",
    rating: 4.83,
    notes: ["Thông xanh", "Xô thơm", "Vetiver"],
    rituals: [
      "Kết hợp playlist \"Forest Bathing\" để thiền nhẹ.",
      "Đặt trong phòng khách tạo cảm giác gỗ tự nhiên.",
    ],
    ledEffect: "LED xanh lá sâu mô phỏng rừng.",
    burnTime: "43 giờ",
  },
  {
    id: "focus-ocean",
    name: "MoodCandle Focus Ocean",
    summary: "Sea salt · Sage · Ánh sáng lam",
    description:
      "Cảm hứng đại dương với muối biển và cây xô thơm, giúp đầu óc tỉnh táo nhưng vẫn thư thái.",
    price: 125000,
    priceDisplay: "125.000đ",
    mood: "focus",
    rating: 4.8,
    notes: ["Sea Salt", "Sage", "Seaweed"],
    rituals: [
      "Đốt khi làm việc nhóm để giữ năng lượng tỉnh táo.",
      "Bật playlist \"Oceanic Flow\" đi kèm.",
    ],
    ledEffect: "LED lam lạnh như sắc biển.",
    burnTime: "40 giờ",
  },
];

export function getProductById(id) {
  return productCatalog.find(product => product.id === id);
}

export function getMoodSuggestion(moodKey) {
  if (!moodKey) return productCatalog[0];
  const directMatch = productCatalog.find(product => product.mood === moodKey);
  if (directMatch) return directMatch;
  return productCatalog.find(product => product.mood === "all") ?? productCatalog[0];
}

export function getRelatedProducts(productId, moodKey) {
  return productCatalog
    .filter(product => product.id !== productId && (product.mood === moodKey || product.mood === "all"))
    .slice(0, 3);
}
