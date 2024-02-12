import { baseApi } from "../base-query/base-query.config";
import { EditPostData, GetPostResponse, LinkPreviewResponse, PostData, PostResponse } from "./type";

export const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPost: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result && result.data ? [...result.data.map(({ id }) => ({ type: "Post" as const, id })), "Post"] : ["Post"],
    }),
    getAuthUserShareLink: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post/auth/link`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result && result.data
          ? [...result.data.map(({ id }) => ({ type: "ShareLink" as const, id })), "ShareLink"]
          : ["ShareLink"],
    }),
    getUserShareLink: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post/user/link`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result && result.data
          ? [...result.data.map(({ id }) => ({ type: "ShareLink" as const, id })), "ShareLink"]
          : ["ShareLink"],
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
      providesTags: (result, error, arg) =>
        result && result.data
          ? [...result.data.map(({ id }) => ({ type: "CreatePost" as const, id })), "CreatePost"]
          : ["CreatePost"],
    }),
    getUserCreatePost: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post/user/create-post`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result && result.data
          ? [...result.data.map(({ id }) => ({ type: "CreatePost" as const, id })), "CreatePost"]
          : ["CreatePost"],
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
      invalidatesTags: ["Post", "ShareLink", "CreatePost"],
    }),
    putPost: builder.mutation<PostResponse, any>({
      query: postDetails => ({
        url: `v1/post/edit`,
        method: "PUT",
        body: postDetails,
      }),
      invalidatesTags: ["Post", "ShareLink", "CreatePost"],
    }),
    deletePost: builder.mutation<PostResponse, number>({
      query: id => ({
        url: `v1/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
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
} = postApi;
