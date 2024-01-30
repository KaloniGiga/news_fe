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
    addPost: builder.mutation<PostResponse, any>({
      query: postDetails => ({
        url: "v1/post/add",
        method: "POST",
        body: postDetails,
      }),
      invalidatesTags: ["Post"],
    }),
    putPost: builder.mutation<PostResponse, any>({
      query: postDetails => ({
        url: `v1/post/edit`,
        method: "PUT",
        body: postDetails,
      }),
      invalidatesTags: ["Post"],
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

export const { useGetPostQuery, useAddPostMutation, usePutPostMutation, useDeletePostMutation } = postApi;
