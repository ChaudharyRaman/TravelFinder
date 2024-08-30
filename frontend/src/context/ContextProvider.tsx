"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";

// Define the shape of the user object.
interface User {
  name: string;
  email: string;
  userPreferences?: IPreferences;

  // Add more fields as needed.
}
export interface IPreferences {
  budget: string;
  interests: string[];
  locations: string;
  duration: number;
}

// Define the shape of the context value
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  setFetch: (fetch: boolean) => void;
  fetch: boolean;
}

// Create the context with a default value
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  setFetch: () => {},
  fetch: false,
});

// Define the type for the provider props
interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [fetch, setFetch] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/signin");
  }, [router]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/signin");
        return;
      }
      try {
        const { data }: AxiosResponse<User> = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data) {
          setUser(data);
        } else {
          console.error("No User Data:", data);
          logout();
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        logout();
      }
    };

    fetchUser();
  }, [logout, router, fetch]);

  return (
    <UserContext.Provider value={{ user, setUser, logout, setFetch, fetch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, ContextProvider };
