import { JobPost } from "@/Types/Types";
import { AppApi } from "./AppApi";

interface GetJobResquestProps {
  search?: string;
  page?: number;
  location?: string;
  salary?: string;
  jobMode?: number | string;
}
interface GetJobResponse {
  count: number;
  msg: string;
  hasMore: boolean;
  data: JobPost[];
  hasPrevious: boolean;
}

export const AppSlice = AppApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<GetJobResponse, GetJobResquestProps>({
      query: ({ search, page, location, salary, jobMode }) => ({
        url: "jobs/get-jobs",
        method: "GET",
        params: {
          search,
          page,
          location,
          salary,
          jobMode,
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
