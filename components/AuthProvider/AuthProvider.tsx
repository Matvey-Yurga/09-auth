"use client";
import { useEffect,useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { CheckSession, getMe } from "@/lib/api/clientApi";
type AuthProviderProps = {
    children: React.ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
    const [loading, setLoading] = useState(true);
useEffect(() => {
    const fetchUser = async () => {
        setLoading(true)
      const isAuthenticated = await CheckSession();
      if (isAuthenticated) {
          const user = await getMe();
          if (user) {
              setUser(user); 
                setLoading(false)
          }
      } else {
          clearIsAuthenticated();
          setLoading(false)
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);
if (loading) {
    return <div>Loading...</div>;
}
  return children;
};
