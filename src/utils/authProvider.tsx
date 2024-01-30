"use client";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { resetAuthUser, setAuthUser } from "@/redux/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { data: userData, error } = useGetUserQuery();
  useEffect(() => {
    if (error) {
      dispatch(resetAuthUser());
    }
    if (userData && userData.data) {
      dispatch(setAuthUser(userData.data));
    }
  }, [userData, error, dispatch]);

  return <div>{children}</div>;
}
