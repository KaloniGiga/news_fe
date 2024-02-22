import { baseApi } from "../base-query/base-query.config";
import { CommentLikeResponse } from "./type";

export const commentLikeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addLikeToAComment: builder.mutation<CommentLikeResponse, number>({
      query: commentId => ({
        url: `v1/comment-like/${commentId}`,
        method: "POST",
      }),
    }),
    removeLikeToAComment: builder.mutation<CommentLikeResponse, number>({
      query: commentId => ({
        url: `v1/comment-like/${commentId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useAddLikeToACommentMutation, useRemoveLikeToACommentMutation } = commentLikeApi;
