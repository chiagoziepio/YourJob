import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db/dbConent";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  //getting all the query params
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;
  const loactionQuery = searchParams.get("location") || "";
  const jobmodeQuery = searchParams.get("jobMode") || null;
  const salary = searchParams.get("salary") || "";
  const pageNumber = page ? parseInt(page as string, 10) : 1;

  //setting the limit and skip i.e number of records to fetch
  const take = 20;
  const skip = (pageNumber - 1) * take;
  try {
    const filters: Prisma.JobsWhereInput = {};
    if (search) {
      filters.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    // Filter by job mode if any
    if (jobmodeQuery) {
      console.log("seen");

      filters.is_remote_work = parseInt(jobmodeQuery, 10);
    }

    // Filter by location if any
    if (loactionQuery) {
      filters.location = { contains: loactionQuery, mode: "insensitive" };
    }
    // Filter by salary if any
    if (salary) {
      // Split the salary range into min and max values
      const [minSalary, maxSalary] = salary
        .split("_")
        .map((s) => parseInt(s, 10));

      filters.AND = [
        { salary_from: { lte: maxSalary } },
        { salary_to: { gte: minSalary } },
      ];
    }
    const jobs = await db.jobs.findMany({
      where: filters,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });
    const allJobs = await db.jobs.count();
    const hasMore = skip + jobs.length < allJobs;
    const hasPrevious = pageNumber > 1;
    return NextResponse.json(
      {
        msg: "Job retrieved successfully",
        data: jobs,
        count:
          search || jobmodeQuery || loactionQuery || salary
            ? jobs.length
            : allJobs,
        hasMore,
        hasPrevious,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
