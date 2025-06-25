import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { auth } from "@/app/firebase";
import { db } from "@/app/firebase";
import { registerUser } from "@/entities/User";
import { loginUser } from "@/entities/User/model/usersSlice";
import { IUser } from "@/entities/User/types/user";

import { AppDispatch } from "../store/store";

interface AuthContextType {
  user: User | null | IUser;
  role: string | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, displayName: string) => {
    await dispatch(registerUser({ email, password, displayName }));
  };

  const login = async (email: string, password: string) => {
    await dispatch(loginUser({ email, password }));
  };

  const logout = async () => {
    await signOut(auth).then(() => setRole(null));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          throw new Error("Пользователь не найден");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    role,
    isAdmin: role === "admin",
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
