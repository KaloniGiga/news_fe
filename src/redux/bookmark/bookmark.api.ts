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
    getBookmarkPosts: builder.query<BookmarkResponse, number | any>({
      query: userId => ({
        url: `v1/bookmark?userId=${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddBookmarkToAPostMutation,
  useRemoveBookmarkFromAPostMutation,
  useGetBookmarkPostsQuery,
  useLazyGetBookmarkPostsQuery,
} = bookmarkApi;

// getBookmarkPosts: builder.query<BookmarkResponse, number | any>({
//   query: userId => ({
//     url: `v1/bookmark?userId=${userId}`,
//     method: "GET",
//   }),
// }),
