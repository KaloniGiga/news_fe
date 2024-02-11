import ProfileLayout from "@/component/AppShell/ProfileLayout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
