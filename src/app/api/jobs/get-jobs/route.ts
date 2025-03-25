import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db/dbConent";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  //getting all the query params
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;
  const loactionQuery = searchParams.get("loaction") || "";
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
    // Filter by location if any
    if (loactionQuery) {
      filters.location = { contains: loactionQuery, mode: "insensitive" };
    }
    // Filter by salary if any
    if (salary) {
      const salaryValue = parseInt(salary as string, 10);
      filters.salary_from = { lte: salaryValue };
      filters.salary_to = { gte: salaryValue };
    }
    const jobs = await db.jobs.findMany({
      where: filters,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });
    const allJobs = await db.jobs.count();
    return NextResponse.json(
      { msg: "Job retrieved successfully", data: jobs, count: allJobs },
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
