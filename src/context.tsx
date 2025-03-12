import { createContext, ReactNode, useContext, useEffect } from "react";
import { useFetch } from "./hooks/useFetch"; // Adjust path if needed
import { getCurrentUser } from "./db/apiAuth"; // Adjust path if needed
import { User } from "@supabase/supabase-js";

type UrlContextType = {
  user: User | null;
  loading: boolean;
  fetchUser: () => any;
  isAuthenticated: boolean;
};

// ✅ Create Context
const UrlContext = createContext<UrlContextType | undefined>(undefined);

// ✅ Provider Component
export const UrlProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  //   console.log("User in Context:", user);
  //   console.log("isAuthenticated:", isAuthenticated);
  //   console.log("Loading:", loading);

  //* Fetch user when app loads
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, loading, fetchUser, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

// ✅ Custom Hook for Context
export const useUrlState = () => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("useUrlState must be used within a UrlProvider");
  }
  return context;
};
