import { baseApi } from "../base-query/base-query.config";
import { NotificationResponse } from "./type";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<NotificationResponse, number>({
      query: page => ({
        url: `v1/notification`,
        method: "GET",
        params: { page },
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useLazyGetNotificationsQuery } = notificationApi;
