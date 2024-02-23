import { baseApi } from "../base-query/base-query.config";
import { postApi } from "../post/post.api";
import { BookmarkResponse } from "./type";

export const bookmarkApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addBookmarkToAPost: builder.mutation<BookmarkResponse, number>({
      query: postId => ({
        url: `v1/bookmark/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["SinglePost"],
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPostByIdForAuthUser", postId, draft => {
            draft.data.hasUserBookmarked = true;
            draft.data.bookmarkNum += 1;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    removeBookmarkFromAPost: builder.mutation<BookmarkResponse, number>({
      query: postId => ({
        url: `v1/bookmark/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SinglePost"],
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPostByIdForAuthUser", postId, draft => {
            draft.data.hasUserBookmarked = false;
            draft.data.bookmarkNum -= 1;
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

export const { useAddBookmarkToAPostMutation, useRemoveBookmarkFromAPostMutation } = bookmarkApi;
