import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "/api";

export const baseQuery = fetchBaseQuery({ baseUrl });

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
});
