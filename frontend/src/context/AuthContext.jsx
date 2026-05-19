import { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

export const AuthContext = createContext(null);

const USER_KEY = "shopsphere_user";
const TOKEN_KEY = "shopsphere_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem(USER_KEY) || "null"));
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  const persistAuth = (authToken, authUser) => {
    localStorage.setItem(TOKEN_KEY, authToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);
  };

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    persistAuth(data.token, data.user);
    toast.success(`Welcome back, ${data.user.name}`);
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    persistAuth(data.token, data.user);
    toast.success("Account created");
  };

  const logout = () => {
    clearAuth();
    toast.success("Logged out");
  };

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/auth/profile");
        setUser(data);
        localStorage.setItem(USER_KEY, JSON.stringify(data));
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      loading,
      login,
      register,
      logout,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
