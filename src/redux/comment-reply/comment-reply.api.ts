import { baseApi } from "../base-query/base-query.config";
import { commentApi } from "../comment/comment.api";
import { CommentReplyData, CommentReplyResponse, GetReplyCommentResponse } from "./type";

export const commentReplyApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCommentReplyByCommentId: builder.query<GetReplyCommentResponse, number>({
      query: commentId => ({
        url: `v1/reply-comment/${commentId}`,
        method: "GET",
      }),
    }),
    createCommentReply: builder.mutation<CommentReplyResponse, CommentReplyData>({
      query: replyDetails => ({
        url: `v1/reply-comment`,
        method: "POST",
        body: replyDetails,
      }),
      invalidatesTags: ["Comments"],
      // invalidatesTags: (result, error, args) => (result ? [{ type: "Comments", id: args.postId }] : ["Comments"]),
    }),
    updateCommentReply: builder.mutation<CommentReplyResponse, CommentReplyData>({
      query: replyDetails => ({
        url: `v1/reply-comment`,
        method: "PUT",
        body: replyDetails,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteCommentReply: builder.mutation<CommentReplyResponse, number>({
      query: id => ({
        url: `v1/reply-comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetCommentReplyByCommentIdQuery,
  useCreateCommentReplyMutation,
  useUpdateCommentReplyMutation,
  useDeleteCommentReplyMutation,
} = commentReplyApi;
