import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base-query-with-auth";

export const BASE_API_SLICE = "baseApi";
export const baseApi = createApi({
  reducerPath: BASE_API_SLICE,
  tagTypes: ["Post"],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});