import { baseApi } from "../base-query/base-query.config";
import { BookmarkData, BookmarkResponse } from "./type";

export const bookmarkApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addBookmark: builder.mutation<BookmarkResponse, BookmarkData>({
      query: bookmarkDetails => ({
        url: "v1/bookmark/add",
        method: "POST",
        body: bookmarkDetails,
      }),
    }),
    removeBookmark: builder.mutation<BookmarkResponse, BookmarkData>({
      query: bookmarkDetails => ({
        url: "v1/bookmark/remove",
        method: "POST",
        body: bookmarkDetails,
      }),
    }),
    getBookmarkPosts: builder.query<BookmarkResponse, number | any>({
      query: userId => ({
        url: `v1/bookmark?userId=${userId}`,
        method: "GET",
      }),
    }),
    checkBookmark: builder.mutation<boolean, any>({
      query: bookmarkedData => ({
        url: `v1/bookmark/check`,
        method: "POST",
        body: bookmarkedData,
      }),
    }),
  }),
});

export const { useAddBookmarkMutation, useRemoveBookmarkMutation, useGetBookmarkPostsQuery, useCheckBookmarkMutation } =
  bookmarkApi;
