"use client";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useGetJobsQuery } from "@/lib/Redux/Features/AppSlice";

const Jobs = () => {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetJobsQuery({ search, page });
  console.log(data);

  return (
    <main className="my-3">
      <MaxWidthWrapper>
        <div className="flex flex-col bg-muted">fdf</div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Jobs;
