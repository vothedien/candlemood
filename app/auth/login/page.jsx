// File: app/auth/login/page.jsx

import { Suspense } from 'react';
// Import component client vừa đổi tên/tạo
import  LoginClient  from './LoginClient'; // Hoặc tên file bạn đặt

export default function LoginPageWrapper() {
  return (
    // Bọc Client Component sử dụng useSearchParams() trong <Suspense>
    <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-amber-50 flex items-center justify-center">
            Đang tải Form Đăng Nhập...
        </div>
    }>
      {/* ⚠️ Lưu ý: Đảm bảo cách import (có {} hay không) khớp với cách export trong LoginClient.jsx */}
      <LoginClient /> 
    </Suspense>
  );
}