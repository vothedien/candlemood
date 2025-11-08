"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(undefined);

const STORAGE_KEY = "candlemood.auth.user";
const USERS_KEY = "candlemood.auth.users";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedUsers = window.localStorage.getItem(USERS_KEY);
      const storedUser = window.localStorage.getItem(STORAGE_KEY);

      if (storedUsers) {
        setUsers(JSON.parse(storedUsers) ?? []);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Không thể tải trạng thái đăng nhập", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;

    try {
      window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error("Không thể lưu danh sách người dùng", error);
    }
  }, [users, hydrated]);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;

    try {
      if (user) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Không thể lưu phiên đăng nhập", error);
    }
  }, [user, hydrated]);

  const register = useCallback(
    ({ name, email, password }) => {
      const trimmedEmail = email?.trim().toLowerCase();
      const trimmedPassword = password?.trim();

      if (!trimmedEmail || !trimmedPassword) {
        return { success: false, message: "Vui lòng nhập email và mật khẩu hợp lệ." };
      }

      if (users.some(existing => existing.email === trimmedEmail)) {
        return { success: false, message: "Email đã được đăng ký. Vui lòng đăng nhập." };
      }

      const profileName = name?.trim() || trimmedEmail.split("@")[0];
      const newUser = {
        id: `${Date.now()}`,
        email: trimmedEmail,
        password: trimmedPassword,
        name: profileName,
      };

      setUsers(prev => [...prev, newUser]);
      const sessionUser = { id: newUser.id, email: newUser.email, name: newUser.name };
      setUser(sessionUser);

      return { success: true, user: sessionUser };
    },
    [users],
  );

  const login = useCallback(
    ({ email, password }) => {
      const trimmedEmail = email?.trim().toLowerCase();
      const trimmedPassword = password?.trim();

      if (!trimmedEmail || !trimmedPassword) {
        return { success: false, message: "Vui lòng nhập email và mật khẩu." };
      }

      const existing = users.find(person => person.email === trimmedEmail);

      if (!existing) {
        return { success: false, message: "Tài khoản không tồn tại. Hãy đăng ký mới." };
      }

      if (existing.password !== trimmedPassword) {
        return { success: false, message: "Mật khẩu chưa chính xác." };
      }

      const sessionUser = { id: existing.id, email: existing.email, name: existing.name };
      setUser(sessionUser);

      return { success: true, user: sessionUser };
    },
    [users],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      hydrated,
      login,
      register,
      logout,
    }),
    [user, hydrated, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được dùng bên trong AuthProvider");
  }
  return context;
}
