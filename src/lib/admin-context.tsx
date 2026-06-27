import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { getAdminHash, setAdminHash } from "@/lib/db";

const SESSION_KEY = "portfolio-admin-session";

async function hash(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface AdminContextValue {
  isAdmin: boolean;
  hasPassword: boolean;
  setPassword: (pwd: string) => Promise<void>;
  login: (pwd: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (oldPwd: string, newPwd: string) => Promise<boolean>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsAdmin(sessionStorage.getItem(SESSION_KEY) === "1");
    getAdminHash().then((h) => {
      setHasPassword(!!h);
    }).catch(console.error);
  }, []);

  const setPassword = useCallback(async (pwd: string) => {
    const h = await hash(pwd);
    await setAdminHash({ data: h });
    sessionStorage.setItem(SESSION_KEY, "1");
    setHasPassword(true);
    setIsAdmin(true);
  }, []);

  const login = useCallback(async (pwd: string) => {
    const stored = await getAdminHash();
    if (!stored) return false;
    const h = await hash(pwd);
    if (h === stored) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }, []);

  const changePassword = useCallback(async (oldPwd: string, newPwd: string) => {
    const stored = await getAdminHash();
    if (stored) {
      const h = await hash(oldPwd);
      if (h !== stored) return false;
    }
    const nh = await hash(newPwd);
    await setAdminHash({ data: nh });
    return true;
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, hasPassword, setPassword, login, logout, changePassword }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within an AdminProvider");
  return ctx;
}
