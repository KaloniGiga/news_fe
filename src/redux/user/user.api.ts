import { baseApi } from "../base-query/base-query.config";
import { ICategoryList, UserResponse, UserUpdateResponse } from "./type";

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updateUser: builder.mutation<UserUpdateResponse, any>({
      query: updateDetails => ({
        url: `v1/user`,
        method: "PATCH",
        body: updateDetails,
      }),
    }),
    addUserCategoryPreference: builder.mutation<UserResponse, ICategoryList>({
      query: categoryList => ({
        url: `v1/user/category`,
        method: "PATCH",
        body: categoryList,
      }),
    }),
    deleteUser: builder.mutation<UserResponse, void>({
      query: () => ({
        url: `v1/user`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useAddUserCategoryPreferenceMutation, useDeleteUserMutation } = userApi;
