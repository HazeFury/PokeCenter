import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

export type User = {
  id: number;
};

export type Auth = {
  user: User;
  token: string;
};
// Interface pour la valeur du contexte
interface AuthContextValue {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
}
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: ContextProviderProps) {
  const [auth, setAuth] = useState(null as Auth | null);

  const memo = useMemo(() => ({ auth, setAuth }), [auth]);

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const value = useContext(AuthContext);
  if (value == null) {
    throw new Error("useAuth has to be used within <AuthProvider>");
  }
  return value;
};
