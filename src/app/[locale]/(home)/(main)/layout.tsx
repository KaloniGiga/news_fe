import MainLayout from "@/component/AppShell/MainLayout";
import { ReactNode } from "react";

export default function MainLayoutProvider({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
