import { AppApi } from "./AppApi";

export const AppSlice = AppApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ search, page, loaction, salary }) => ({
        url: "/get-jobs",
        method: "GET",
        params: {
          search,
          page,
          loaction,
          salary,
        },
      }),
      providesTags: ["jobs"],
    }),
  }),
});

export const { useGetJobsQuery } = AppSlice;
