import { baseApi } from "../base-query/base-query.config";
import { EditPostData, GetPostResponse, LinkPreviewResponse, PostData, PostResponse } from "./type";

export const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPost: builder.query<GetPostResponse, void>({
      query: () => ({
        url: `v1/post`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    addPost: builder.mutation<PostResponse, any>({
      query: postDetails => ({
        url: "v1/post/add",
        method: "POST",
        body: postDetails,
      }),
    }),
    putPost: builder.mutation<PostResponse, any>({
      query: ({ id, ...postDetails }) => ({
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
