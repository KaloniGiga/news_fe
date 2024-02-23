import { baseApi } from "../base-query/base-query.config";
import { EditPostData, GetPostResponse, LinkPreviewResponse, PostData, PostResponse } from "./type";

export const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPost: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post`,
        method: "GET",
      }),
    }),
    getPostById: builder.query<PostResponse, number>({
      query: id => ({
        url: `v1/post/${id}`,
        method: "GET",
      }),
    }),
    getPostByIdForAuthUser: builder.query<PostResponse, number>({
      query: id => ({
        url: `v1/post/auth/${id}`,
        method: "GET",
      }),
      providesTags: ["SinglePost"],
    }),
    getAuthUserShareLink: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post/auth/link`,
        method: "GET",
      }),
    }),
    getUserShareLink: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post/user/link`,
        method: "GET",
      }),
    }),
    getShareLink: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post/link`,
        method: "GET",
      }),
    }),
    getAuthUserCreatePost: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post/auth/create-post`,
        method: "GET",
      }),
    }),
    getUserCreatePost: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post/user/create-post`,
        method: "GET",
      }),
    }),
    getCreatePost: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post/create-post`,
        method: "GET",
      }),
    }),
    addPost: builder.mutation<PostResponse, any>({
      query: postDetails => ({
        url: "v1/post/add",
        method: "POST",
        body: postDetails,
      }),
    }),
    putPost: builder.mutation<PostResponse, any>({
      query: postDetails => ({
        url: `v1/post/edit`,
        method: "PUT",
        body: postDetails,
      }),
    }),
    deletePost: builder.mutation<PostResponse, number>({
      query: id => ({
        url: `v1/post/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetAuthUserCreatePostQuery,
  useLazyGetAuthUserCreatePostQuery,
  useLazyGetAuthUserShareLinkQuery,
  useGetAuthUserShareLinkQuery,
  useGetCreatePostQuery,
  useGetShareLinkQuery,
  useGetUserCreatePostQuery,
  useGetUserShareLinkQuery,
  useAddPostMutation,
  usePutPostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useLazyGetPostByIdForAuthUserQuery,
  useLazyGetPostByIdQuery,
} = postApi;
