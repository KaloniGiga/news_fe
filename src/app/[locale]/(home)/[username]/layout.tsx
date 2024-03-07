import UserInfoLayout from "@/component/AppShell/UserInfoLayout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <UserInfoLayout>{children}</UserInfoLayout>;
}
