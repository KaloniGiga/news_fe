import { baseApi } from "../base-query/base-query.config";

export const linkPreviewApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLinkPreview: builder.query<any, string>({
      query: link => ({
        url: `v1/link-preview`,
        params: { link },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLinkPreviewQuery } = linkPreviewApi;
