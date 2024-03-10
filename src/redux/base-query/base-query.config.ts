import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base-query-with-auth";

export const BASE_API_SLICE = "baseApi";
export const baseApi = createApi({
  reducerPath: BASE_API_SLICE,
  tagTypes: ["SinglePost", "Post", "Comments"],
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 10,
  endpoints: () => ({}),
});
