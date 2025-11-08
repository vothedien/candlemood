"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { CartProvider } from "./cart-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
