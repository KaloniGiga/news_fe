import { baseApi } from "../base-query/base-query.config";
import { LoginResponse, PasswordDetail, UserData } from "./type";

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    readLogin: builder.mutation<LoginResponse, UserData>({
      query: userData => ({
        url: `v1/auth/login`,
        method: "POST",
        body: userData,
      }),
    }),
    createUser: builder.mutation<LoginResponse, UserData>({
      query: userDetails => ({
        url: "v1/auth/signup",
        method: "POST",
        body: userDetails,
      }),
    }),
    googleAuth: builder.query<any, void>({
      query: () => ({
        url: "v1/auth/google",
        method: "GET",
      }),
    }),
    logout: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: "v1/auth/logout",
        method: "POST",
      }),
    }),
    changePassword: builder.mutation<LoginResponse, PasswordDetail>({
      query: passwordDetail => ({
        url: "v1/auth/change/password",
        method: "PATCH",
        body: passwordDetail,
      }),
    }),
    getUser: builder.query<LoginResponse, void>({
      query: () => ({
        url: "v1/auth/user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useReadLoginMutation,
  useCreateUserMutation,
  useLogoutMutation,
  useGetUserQuery,
  useLazyGoogleAuthQuery,
  useChangePasswordMutation,
} = authApi;
