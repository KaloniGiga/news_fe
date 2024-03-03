import { baseApi } from "../base-query/base-query.config";
import { NotificationResponse } from "./type";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<NotificationResponse, void>({
      query: () => ({
        url: `v1/notification/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
