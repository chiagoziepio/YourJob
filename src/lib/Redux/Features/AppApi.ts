import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AppApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://your-job-amber.vercel.app/api`,
  }),
  endpoints: () => ({}),
  tagTypes: ["jobs"],
});
