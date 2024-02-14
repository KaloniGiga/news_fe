"use client";
import Header from "@/component/Navbar/Header";
import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

export default function TargetPostsLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} styles={{ main: { backgroundColor: "var(--mantine-color-body)" } }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
