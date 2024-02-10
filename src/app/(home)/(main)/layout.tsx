import MainLayout from "@/component/AppShell/MainLayout";
import AuthProvider from "@/utils/authProvider";
import { ReactNode } from "react";

export default function MainLayoutProvider({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
