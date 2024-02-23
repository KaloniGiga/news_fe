import { baseApi } from "../base-query/base-query.config";
import { postApi } from "../post/post.api";
import { UpvoteResponse } from "./type";

export const upvoteApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addUpvoteToAPost: builder.mutation<UpvoteResponse, number>({
      query: postId => ({
        url: `v1/upvote/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["SinglePost"],
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPostByIdForAuthUser", postId, draft => {
            draft.data.hasUserUpvoted = true;
            draft.data.upvoteNum += 1;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    removeUpvoteFromAPost: builder.mutation<UpvoteResponse, number>({
      query: postId => ({
        url: `v1/upvote/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SinglePost"],
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPostByIdForAuthUser", postId, draft => {
            draft.data.hasUserUpvoted = false;
            draft.data.upvoteNum -= 1;
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

export const { useAddUpvoteToAPostMutation, useRemoveUpvoteFromAPostMutation } = upvoteApi;
