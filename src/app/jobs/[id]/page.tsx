import Preview from "@/Components/JobDetails/Preview";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import { db } from "@/lib/db/dbConent";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = await db.jobs.findUnique({
    where: {
      id,
    },
  });
  if (!job) {
    return {
      title: "YourJob | Not Found",
    };
  }
  return {
    title: `YourJob | ${job.title}`,
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const job = await db.jobs.findUnique({
    where: {
      id,
    },
  });
  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <MaxWidthWrapper>
      <main className=" bg-muted">
        <Preview job={job} />
      </main>
    </MaxWidthWrapper>
  );
};

export default page;
