"use client";
import React, { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useGetJobsQuery } from "@/lib/Redux/Features/AppSlice";

import Filters from "./Filters";
import JobWrapper from "./JobWrapper";
import { Button } from "./ui/button";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import SalaryFilter from "./FilterComponents/SalaryFilter";

import SiteFilter from "./FilterComponents/SiteFilter";

const Jobs = () => {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [jobMode, setJobMode] = useState<number | string>("");
  const { data, isLoading } = useGetJobsQuery({
    search,
    page,
    location,
    salary,
    jobMode,
  });
  // console.log(data);
  const jobData = data?.data || [];
  // console.log(jobData);

  return (
    <main className="">
      <MaxWidthWrapper>
        <section className="flex flex-col bg-muted">
          <div>
            <Filters
              search={search}
              setSearch={setSearch}
              setLocation={setLocation}
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
              setSalary={setSalary}
              setJobMode={setJobMode}
            />
          </div>
          {isLoading ? (
            <p className="p-5 open-sans-medium text-base">loading...</p>
          ) : (
            <div className="w-full ">
              {jobData.length === 0 ? (
                <div>No Jobs Found</div>
              ) : (
                <div className="flex ">
                  <aside className=" p-3 hidden lg:flex flex-col gap-3">
                    <SalaryFilter setSalary={setSalary} />
                    <SiteFilter setJobMode={setJobMode} />
                  </aside>
                  <div className="flex-1 flex flex-col gap-3">
                    <p className="mt-4 flex  items-center gap-1">
                      <span className="poppins-medium text-base">
                        Recommended Jobs
                      </span>
                      <span className="w-fit h-fit px-3.5 py-2 border border-muted-foreground text-muted-foreground text-base open-sans-regular rounded-[20px]">
                        {data?.count}
                      </span>
                    </p>
                    <JobWrapper data={jobData} />
                  </div>
                </div>
              )}
            </div>
          )}
          {!isLoading && jobData.length !== 0 && (
            <div className="flex justify-center gap-4 pb-5">
              <Button
                size={"icon"}
                disabled={isLoading || !data?.hasPrevious}
                onClick={() => setPage((prev) => prev - 1)}
                className="cursor-pointer"
              >
                <FaAngleLeft size={17} />
              </Button>
              <Button
                size={"icon"}
                disabled={isLoading || !data?.hasMore}
                onClick={() => setPage((prev) => prev + 1)}
                className="cursor-pointer"
              >
                <FaAngleRight size={17} />
              </Button>
            </div>
          )}
        </section>
      </MaxWidthWrapper>
    </main>
  );
};

export default Jobs;
