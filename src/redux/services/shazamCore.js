import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "BASE URL HERE",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "X-RAPIDAPI-KEY HERE"
      );
      return headers
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/track'})
  }),
});

export const {
    useGetTopChartsQuery,
} = shazamCoreApi
