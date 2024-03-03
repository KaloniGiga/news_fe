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
    getAuthUserShareLink: builder.query<GetPostResponse, number>({
      query: (page = 1) => ({
        url: `v1/post/auth/link`,
        method: "GET",
        params: { page },
      }),
    }),
    getUserShareLink: builder.query<GetPostResponse, number>({
      query: (page = 1) => ({
        url: `v1/post/user/link`,
        method: "GET",
        params: { page },
      }),
    }),
    getShareLink: builder.query<GetPostResponse, number>({
      query: (page = 1) => ({
        url: `v1/post/link`,
        method: "GET",
        params: { page },
      }),
    }),
    getAuthUserCreatePost: builder.query<GetPostResponse, number>({
      query: (page = 1) => ({
        url: `v1/post/auth/create-post`,
        method: "GET",
        params: { page },
      }),
    }),
    getUserCreatePost: builder.query<GetPostResponse, number>({
      query: (page = 1) => ({
        url: `v1/post/user/create-post`,
        method: "GET",
        params: { page },
      }),
    }),
    getCreatePost: builder.query<GetPostResponse, number>({
      query: (page = 1) => ({
        url: `v1/post/create-post`,
        method: "GET",
        params: { page },
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
  useLazyGetShareLinkQuery,
  useAddPostMutation,
  usePutPostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useLazyGetPostByIdForAuthUserQuery,
  useLazyGetPostByIdQuery,
} = postApi;
