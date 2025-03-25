"use client";
import React, { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useGetJobsQuery } from "@/lib/Redux/Features/AppSlice";

import Filters from "./Filters";
import JobWrapper from "./JobWrapper";

const Jobs = () => {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [location, setLocation] = useState("");
  const { data, isLoading } = useGetJobsQuery({ search, page, location });
  // console.log(data);
  const jobData = data?.data || [];

  return (
    <main className="">
      <MaxWidthWrapper>
        <section className="flex flex-col bg-muted">
          <div>
            <Filters
              search={search}
              setSearch={setSearch}
              setLocation={setLocation}
            />
          </div>
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <div className="w-full ">
              {jobData.length === 0 ? (
                <div>No Jobs Found</div>
              ) : (
                <JobWrapper data={data?.data} />
              )}
            </div>
          )}
        </section>
      </MaxWidthWrapper>
    </main>
  );
};

export default Jobs;
