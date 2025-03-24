import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AppApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/api`,
  }),
  endpoints: () => ({}),
  tagTypes: ["jobs"],
});
