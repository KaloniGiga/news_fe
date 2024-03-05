"use client";
import Header from "@/component/Navbar/Header";
import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

export default function UserInfoLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <div className="w-full h-full toggleBodyColor">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
