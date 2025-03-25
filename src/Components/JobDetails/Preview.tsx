"use client";
import { JobPost } from "@/Types/Types";
import { format } from "date-fns";
import { LucideDot } from "lucide-react";
import React from "react";
import AppliciationForm from "../AppliciationForm";
import DesTags from "./DesTags";

const Preview = ({ job }: { job: JobPost }) => {
  return (
    <div className="py-6 px-4">
      <div className="flex flex-col gap-2 border-b pb-4">
        <h2 className="text-xl open-sans-semibold ">{job.title}</h2>
        <h4 className=" bg-gradient-to-r from-purple-300  to-green-300 bg-clip-text text-transparent text-base poppins-medium">
          {job.company}
        </h4>
        <div className="flex md:items-center justify-between flex-col gap-y-4 md:flex-row">
          <div>
            <p className="flex items-center gap-1 text-muted-foreground text-sm open-sans-regular">
              <span>{job.location}</span>
              <LucideDot />
              <span>{job.is_remote_work === 1 ? "Remote" : "Onsite"}</span>
            </p>
            <p className="flex items-center gap-1 text-muted-foreground text-sm open-sans-regular">
              <span>
                Posted on{" "}
                {format(new Date(job.createdAt as Date), "dd MMM yyyy")}
              </span>
              <LucideDot />
              <span>{job.number_of_opening} slots available</span>
            </p>
          </div>
          <div className="w-[150px]">
            <AppliciationForm name={job.title} jobId={job.id!} />
          </div>
        </div>
      </div>
      <div className="my-5 flex flex-wrap gap-4  ">
        <DesTags heading={"Employment Type"} subtext={job.employment_type} />
        <DesTags heading={"Client's budget"} subtext={job.salary_to} />
        <DesTags heading={"Deadline"} subtext={job.application_deadline} />
      </div>
      <div className="my-5 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg open-sans-semibold">Job Overview</h3>
          <p className="text-muted-foreground text-base open-sans-regular">
            {job.description}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg open-sans-semibold">Requirements</h3>
          <div>
            {job.qualifications.map((qualification, index) => (
              <div key={index} className="flex gap-2 items-center">
                <LucideDot />
                <p className="text-muted-foreground text-base open-sans-regular">
                  {qualification}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
