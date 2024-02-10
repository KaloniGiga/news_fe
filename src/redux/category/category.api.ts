import { baseApi } from "../base-query/base-query.config";
import { CategoryResponse } from "./type";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCategory: builder.query<CategoryResponse, void>({
      query: () => ({
        url: "v1/category",
        method: "GEt",
      }),
    }),
  }),
});

export const { useGetCategoryQuery } = categoryApi;
