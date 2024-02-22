import { baseApi } from "../base-query/base-query.config";
import { CommentData, CommentResponse, GetCommentResponse } from "./type";

export const commentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCommentsByPostId: builder.query<GetCommentResponse, number>({
      query: postId => ({
        url: `v1/comment/${postId}`,
        method: "GET",
      }),
    }),
    createComment: builder.mutation<CommentResponse, CommentData>({
      query: commentDetails => ({
        url: `v1/comment`,
        method: "POST",
        body: commentDetails,
      }),
    }),
    updateComment: builder.mutation<CommentResponse, CommentData>({
      query: commentDetails => ({
        url: `v1/comment`,
        method: "PATCH",
        body: commentDetails,
      }),
    }),
    deleteComment: builder.mutation<CommentResponse, number>({
      query: id => ({
        url: `v1/comment/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useGetCommentsByPostIdQuery,
  useDeleteCommentMutation,
} = commentApi;
