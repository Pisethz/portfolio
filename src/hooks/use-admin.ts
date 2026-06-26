import { useState, useEffect, useCallback } from "react";

const PASS_KEY = "portfolio-admin-pass";
const SESSION_KEY = "portfolio-admin-session";

async function hash(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHasPassword(!!localStorage.getItem(PASS_KEY));
    setIsAdmin(sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  const setPassword = useCallback(async (pwd: string) => {
    const h = await hash(pwd);
    localStorage.setItem(PASS_KEY, h);
    sessionStorage.setItem(SESSION_KEY, "1");
    setHasPassword(true);
    setIsAdmin(true);
  }, []);

  const login = useCallback(async (pwd: string) => {
    const stored = localStorage.getItem(PASS_KEY);
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

  const changePassword = useCallback(
    async (oldPwd: string, newPwd: string) => {
      const stored = localStorage.getItem(PASS_KEY);
      if (stored) {
        const h = await hash(oldPwd);
        if (h !== stored) return false;
      }
      const nh = await hash(newPwd);
      localStorage.setItem(PASS_KEY, nh);
      return true;
    },
    [],
  );

  return { isAdmin, hasPassword, setPassword, login, logout, changePassword };
}
