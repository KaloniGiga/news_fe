import MainLayout from "@/component/AppShell/MainLayout";
import Header from "@/component/Navbar/Header";
import Sidebar from "@/component/Sidebar/Sidebar";
import AuthProvider from "@/utils/authProvider";
import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  );
}
