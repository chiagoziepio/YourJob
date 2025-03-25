import { JobPost } from "@/Types/Types";
import React from "react";
import { motion } from "framer-motion";

import JobCard from "./JobCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const JobWrapper = ({ data }: { data: JobPost[] | [] }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-6 my-4 px-4 w-full"
    >
      {data.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </motion.div>
  );
};

export default JobWrapper;
