import { ReactNode } from "react";

import { useAuth } from "@/app/providers/AuthProvider";
import { Error as ErrorPage } from "@/pages/Error/Error";
import { Login } from "@/pages/Login";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return children;
};

export const ProtectedAdminRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isAdmin, isSuperAdmin } = useAuth();

  if (!user) {
    return <Login />;
  }

  if (!isAdmin && !isSuperAdmin) {
    return <ErrorPage />;
  }

  return children;
};
