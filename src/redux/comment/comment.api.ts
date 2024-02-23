import { baseApi } from "../base-query/base-query.config";
import { CommentData, CommentResponse, GetCommentResponse } from "./type";

export const commentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCommentsByPostId: builder.query<GetCommentResponse, number>({
      query: postId => ({
        url: `v1/comment/${postId}`,
        method: "GET",
      }),
      // providesTags: (result, error, args) => (result ? [{ type: "Comments", id: args }] : ["Comments"]),
      providesTags: ["Comments"],
    }),
    createComment: builder.mutation<CommentResponse, CommentData>({
      query: commentDetails => ({
        url: `v1/comment`,
        method: "POST",
        body: commentDetails,
      }),
      invalidatesTags: ["Comments"],
      // invalidatesTags: (result, error, args) => result ? [{ type: "Comments", id: args.postId }] : ["Comments"],
    }),
    updateComment: builder.mutation<CommentResponse, CommentData>({
      query: commentDetails => ({
        url: `v1/comment`,
        method: "PATCH",
        body: commentDetails,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation<CommentResponse, number>({
      query: id => ({
        url: `v1/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useGetCommentsByPostIdQuery,
  useDeleteCommentMutation,
  useLazyGetCommentsByPostIdQuery,
} = commentApi;
