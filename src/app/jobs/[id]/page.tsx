import BackBtn from "@/Components/BackBtn";
import JobErrorFallback from "@/Components/Errors";
import Preview from "@/Components/JobDetails/Preview";
import JobDetailsSkeleton from "@/Components/Loading";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import { db } from "@/lib/db/dbConent";
import { Metadata } from "next";

import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
  try {
    const { id } = await params;
    const job = await db.jobs.findUnique({
      where: {
        id,
      },
    });
    if (!job) {
      return (
        <p className="open-sans-semibold text-xl text-center my-10">
          Job not found
        </p>
      );
    }

    return (
      <ErrorBoundary FallbackComponent={JobErrorFallback}>
        <Suspense fallback={<JobDetailsSkeleton />}>
          <MaxWidthWrapper>
            <main className=" bg-muted">
              <BackBtn />
              <Preview job={job} />
            </main>
          </MaxWidthWrapper>
        </Suspense>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Job details page error:", error);
    throw error;
  }
};

export default page;
