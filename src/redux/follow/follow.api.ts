import { baseApi } from "../base-query/base-query.config";
import { FollowStatusResponse } from "./type";

export const followApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    followUnfollowUser: builder.mutation<any, number>({
      query: followingId => ({
        url: `v1/follow/${followingId}`,
        method: "POST",
      }),
    }),
    checkFollowStatus: builder.query<FollowStatusResponse, number>({
      query: followingId => ({
        url: `v1/follow/${followingId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFollowUnfollowUserMutation, useCheckFollowStatusQuery, useLazyCheckFollowStatusQuery } = followApi;
