import { baseApi } from "../base-query/base-query.config";
import { BookmarkResponse } from "./type";

export const bookmarkApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addBookmarkToAPost: builder.mutation<BookmarkResponse, number>({
      query: postId => ({
        url: `v1/bookmark/${postId}`,
        method: "POST",
      }),
    }),
    removeBookmarkFromAPost: builder.mutation<BookmarkResponse, number>({
      query: postId => ({
        url: `v1/bookmark/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useAddBookmarkToAPostMutation, useRemoveBookmarkFromAPostMutation } = bookmarkApi;
