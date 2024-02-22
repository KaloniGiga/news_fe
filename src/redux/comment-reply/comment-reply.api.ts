import { baseApi } from "../base-query/base-query.config";
import { CommentReplyData, CommentReplyResponse, GetReplyCommentResponse } from "./type";

export const commentReplyApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCommentReplyByCommentId: builder.query<GetReplyCommentResponse, number>({
      query: commentId => ({
        url: `v1/reply-comment/${commentId}`,
        method: "GET",
      }),
      //   transformResponse: (response: GetReplyCommentResponse, meta, arg) => response.data,
    }),
    createCommentReply: builder.mutation<CommentReplyResponse, CommentReplyData>({
      query: replyDetails => ({
        url: `v1/reply-comment`,
        method: "POST",
        body: replyDetails,
      }),
    }),
    updateCommentReply: builder.mutation<CommentReplyResponse, CommentReplyData>({
      query: replyDetails => ({
        url: `v1/reply-comment`,
        method: "PUT",
        body: replyDetails,
      }),
    }),
    deleteCommentReply: builder.mutation<CommentReplyResponse, number>({
      query: id => ({
        url: `v1/reply-comment/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCommentReplyByCommentIdQuery,
  useCreateCommentReplyMutation,
  useUpdateCommentReplyMutation,
  useDeleteCommentReplyMutation,
} = commentReplyApi;
