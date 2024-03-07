import AuthProvider from "@/utils/authProvider";
import React from "react";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
