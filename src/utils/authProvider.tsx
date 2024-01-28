"use client";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  //   const router = useRouter();
  //   const dispath = useAppDispatch();
  // const { data, error } = useGetUserQuery();
  //   const isAuthenticated = useAppSelector(selectAuthenticated);

  return <div>{children}</div>;
}
