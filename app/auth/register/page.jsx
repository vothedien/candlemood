
import { Suspense } from 'react';
// Import component client vừa tạo/đổi tên
import RegisterClient  from './RegisterClient'; 

// Đây là Server Component mặc định
export default function RegisterPageWrapper() {
  return (
    // BẮT BUỘC phải bọc thành phần Client component sử dụng useSearchParams() bằng <Suspense>
    // để Next.js xử lý được Server Pre-rendering
    <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-amber-50 flex items-center justify-center">
            Đang tải Form...
        </div>
    }>
      <RegisterClient />
    </Suspense>
  );
}