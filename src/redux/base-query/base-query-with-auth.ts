"use client";
import { BaseQueryApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { isFetchBaseQueryError } from "./type";
import { notifications } from "@mantine/notifications";
import { resetAuthUser } from "../auth/auth.slice";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && isFetchBaseQueryError(result.error)) {
    if (result.error.status == 401 || result.error.status == 403) {
      api.dispatch(resetAuthUser());
      //  notifications.show({
      //    message: (result.error.data as any)?.message,
      //  })
    }
    //  else {
    //   notifications.show({
    //     message: (result.error.data as any)?.message,
    //   })
    // }
  }
  return result;
};
