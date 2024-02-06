"use client";
import { BaseQueryApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { isFetchBaseQueryError } from "./type";
import { notifications } from "@mantine/notifications";
import { resetAuthUser } from "../auth/auth.slice";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && isFetchBaseQueryError(result.error)) {
    if (result.error.status == 401 || (result.error.data as any)?.message == "You are not logged in") {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshResult = await baseQuery({ credentials: "include", url: "v1/auth/refresh" }, api, extraOptions);
          if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(resetAuthUser());
            //  window.location.href = "/login";
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }
  return result;
};
