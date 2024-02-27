import { baseApi } from "../base-query/base-query.config";
import { GetUserListResponse, ICategoryList, UserResponse, UserUpdateResponse } from "./type";

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updateUser: builder.mutation<UserUpdateResponse, any>({
      query: updateDetails => ({
        url: `v1/user`,
        method: "PATCH",
        body: updateDetails,
      }),
    }),
    getUserByUsername: builder.query<UserUpdateResponse, string>({
      query: username => ({
        url: `/v1/user/${username}`,
        method: "GET",
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
    getUserForMention: builder.query<GetUserListResponse, string>({
      query: username => ({
        url: `v1/user/mention`,
        method: "GET",
        params: { username },
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useAddUserCategoryPreferenceMutation,
  useDeleteUserMutation,
  useGetUserForMentionQuery,
  useLazyGetUserForMentionQuery,
  useGetUserByUsernameQuery,
} = userApi;
