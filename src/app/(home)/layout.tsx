import AuthProvider from "@/utils/authProvider";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="w-full h-full">{children}</div>
    </AuthProvider>
  );
}
