import { baseApi } from "../base-query/base-query.config";
import { AddCategoryPreferenceResponse, ICategoryList } from "./type";

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updateUser: builder.mutation({
      query: updateDetails => ({
        url: `v1/user/update`,
        method: "PUT",
        body: updateDetails,
      }),
    }),
    addUserCategoryPreference: builder.mutation<AddCategoryPreferenceResponse, ICategoryList>({
      query: categoryList => ({
        url: `v1/user/category`,
        method: "PATCH",
        body: categoryList,
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useAddUserCategoryPreferenceMutation } = userApi;
