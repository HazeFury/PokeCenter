import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";

interface ContextProviderProps {
  children: ReactNode;
}

export type User = {
  id: number;
  name: string;
};

export type Auth = {
  user: User;
  token: string;
};

// Interface pour la valeur du contexte
interface AuthContextValue {
  auth: Auth | null;
  login: (user: Auth) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: ContextProviderProps) {
  const [auth, setAuth] = useState(null as Auth | null);

  const login = useCallback(
    (user: Auth) => {
      if (auth !== null) {
        toast.error("Vous êtes déjà connecté");
        return;
      }
      setAuth(user);
      toast.success(`Hello ${user.user.name}, content de te revoir ! 😊`);
    },
    [auth],
  );
  const logout = useCallback(() => {
    if (auth !== null) {
      toast.info(`À bientôt ${auth.user.name}`);
      setAuth(null);
    }
  }, [auth]);

  const memo = useMemo(() => ({ auth, login, logout }), [auth, login, logout]);

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (value == null) {
    throw new Error("useAuth has to be used within <AuthProvider>");
  }
  return value;
};
