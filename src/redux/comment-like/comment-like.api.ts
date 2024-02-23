import { comment } from "postcss";
import { baseApi } from "../base-query/base-query.config";
import { commentApi } from "../comment/comment.api";
import { CommentLikeData, CommentLikeResponse } from "./type";

export const commentLikeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addLikeToAComment: builder.mutation<CommentLikeResponse, CommentLikeData>({
      query: ({ commentId, postId }) => ({
        url: `v1/comment-like/${commentId}`,
        method: "POST",
      }),
      invalidatesTags: ["Comments"],
      async onQueryStarted({ commentId, postId }, { dispatch, queryFulfilled }) {
        console.log(commentId, postId);
        const patchResult = dispatch(
          commentApi.util.updateQueryData("getCommentsByPostId", postId, draft => {
            const targetComment = draft.data.find(comment => comment.id == commentId);
            if (targetComment) {
              targetComment.hasUserLiked = true;
              targetComment.commentLikesNum += 1;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    removeLikeToAComment: builder.mutation<CommentLikeResponse, CommentLikeData>({
      query: ({ commentId, postId }) => ({
        url: `v1/comment-like/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
      async onQueryStarted({ commentId, postId }, { dispatch, queryFulfilled }) {
        console.log(commentId, postId);
        const patchResult = dispatch(
          commentApi.util.updateQueryData("getCommentsByPostId", postId, draft => {
            const targetComment = draft.data.find(comment => comment.id == commentId);
            if (targetComment) {
              targetComment.hasUserLiked = false;
              targetComment.commentLikesNum -= 1;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useAddLikeToACommentMutation, useRemoveLikeToACommentMutation } = commentLikeApi;
