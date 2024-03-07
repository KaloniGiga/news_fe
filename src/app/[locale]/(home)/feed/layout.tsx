import TargetPostsLayout from "@/component/AppShell/TargetPostsLayout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <TargetPostsLayout>{children}</TargetPostsLayout>;
}
