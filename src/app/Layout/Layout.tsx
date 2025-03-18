import "./index.css";

import { Outlet } from "react-router-dom";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import { useAuth } from "../providers/AuthProvider";

export const Layout = () => {
  const { isAdmin } = useAuth();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
    </>
  );
};
