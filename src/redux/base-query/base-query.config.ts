import { createApi } from "@reduxjs/toolkit/query";
import { baseQuery } from "./base-query-with-auth";

export const BASE_API_SLICE = "baseApi";
export const baseApi = createApi({
  reducerPath: BASE_API_SLICE,
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
