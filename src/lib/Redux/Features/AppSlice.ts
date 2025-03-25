import { AppApi } from "./AppApi";

export const AppSlice = AppApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ search, page, location, salary }) => ({
        url: "jobs/get-jobs",
        method: "GET",
        params: {
          search,
          page,
          location,
          salary,
        },
      }),
      providesTags: ["jobs"],
    }),
    getJobLocation: builder.query({
      query: ({ page = 0 }) => ({
        url: `/jobs/locations`,
        method: "GET",
        params: { page },
      }),
      transformResponse: (response: {
        data: string[];
        nextPage: number | null;
      }) => response,
    }),
  }),
});

export const { useGetJobsQuery, useLazyGetJobLocationQuery } = AppSlice;
