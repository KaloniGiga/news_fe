import { baseApi } from "../base-query/base-query.config";
import { UpvoteResponse } from "./type";

export const upvoteApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addUpvoteToAPost: builder.mutation<UpvoteResponse, number>({
      query: postId => ({
        url: `v1/upvote/${postId}`,
        method: "POST",
      }),
    }),
    removeUpvoteToAPost: builder.mutation<UpvoteResponse, number>({
      query: postId => ({
        url: `v1/upvote/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useAddUpvoteToAPostMutation, useRemoveUpvoteToAPostMutation } = upvoteApi;
