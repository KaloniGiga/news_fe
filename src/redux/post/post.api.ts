import { baseApi } from "../base-query/base-query.config";
import { EditPostData, PostData, PostResponse } from "./type";

export const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPost: builder.query<PostResponse, void>({
      query: () => ({
        url: `v1/news`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    addPost: builder.mutation<PostResponse, PostData>({
      query: postDetails => ({
        url: "v1/post",
        method: "POST",
        body: postDetails,
      }),
      invalidatesTags: ["Post"],
    }),
    putPost: builder.mutation<PostResponse, EditPostData>({
      query: ({ postDetails, id }) => ({
        url: `v1/post/${id}`,
        method: "PUT",
        body: postDetails,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<PostResponse, number[]>({
      query: ids => ({
        url: `v1/post?ids=${ids}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetPostQuery, useAddPostMutation, usePutPostMutation, useDeletePostMutation } = postApi;
