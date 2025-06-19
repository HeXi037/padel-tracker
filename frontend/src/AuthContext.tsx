import { createContext, useContext, useState, ReactNode } from "react";
import api from "./api";

interface Auth {
  user: { id: number; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
const Ctx = createContext<Auth>(null!);
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}
