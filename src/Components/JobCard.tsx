import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { JobPost } from "@/Types/Types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import { truncateText } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

import AppliciationForm from "./AppliciationForm";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const JobCard = ({ job }: { job: JobPost }) => {
  return (
    <motion.div
      variants={itemVariants}
      className=" lg:w-[300px] w-full  h-fit flex flex-col gap-4 bg-white dark:bg-black/45 p-4 rounded-lg shadow-md hover:scale-[1.02] transition-all duration-300 ease-in-out"
    >
      <Link key={job.id} href={`/jobs/${job.id}`} className="w-fit">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2.5 items-center">
            <Avatar>
              <AvatarImage src={job.company} />
              <AvatarFallback className="bg-gray-200 rounded-[50%] text-black open-sans-regular text-base ">
                {job.company.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm open-sans-regular text-muted-foreground">
              {format(new Date(job?.createdAt as Date), "MMM yyyy dd")}
            </span>
          </div>
          <h2 className="text-lg open-sans-medium text-muted-foreground">
            {job.company}
          </h2>
        </div>
      </Link>
      <div className="flex flex-col gap-3">
        <h3 className="text-base open-sans-medium ">{job.title}</h3>
        <p className="text-muted-foreground text-sm">
          {truncateText(job.description, 100)}
        </p>
        <div className="flex justify-evenly items-center ">
          <span className="bg-purple-200 text-purple-500 text-sm poppins-regular p-1.5  min-w-[80px] max-w-[100px] h-fit rounded-[30px] flex justify-center items-center">
            {job.is_remote_work === 1 ? "Remote" : "Onsite"}
          </span>
          <span className="bg-green-100 text-green-500 text-sm poppins-regular p-1.5 w-[170px]   h-fit rounded-[30px] flex justify-center items-center truncate">
            {job.employment_type}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="flex flex-col gap-0.5 text-xs open-sans-regular text-muted-foreground">
            <span className="text-sm">Budget</span>
            <span>${job.salary_to}</span>
          </p>
          <div className="flex gap-3">
            <Link
              href={`/jobs/${job.id}`}
              className={buttonVariants({
                variant: "link",
                className:
                  "text-primary !text-xs open-sans-regular p-1 w-fit border ",
                size: "sm",
              })}
            >
              Details
            </Link>

            <AppliciationForm name={job.title} jobId={job.id!} />
          </div>
        </div>
        <span>{job.location}</span>
      </div>
    </motion.div>
  );
};

export default JobCard;
