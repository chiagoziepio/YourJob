import { db } from "../../../../lib/db/dbConent";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = 20;

    const totalLocations = await db.jobs.count();

    const locations = await db.jobs.findMany({
      distinct: ["location"],
      select: { location: true },
      take: pageSize,
      skip: page * pageSize,
    });

    const allLocations = locations.map((location) => location.location);

    const nextPage =
      page * pageSize + allLocations.length < totalLocations ? page + 1 : null;

    return NextResponse.json({
      data: allLocations,
      nextPage,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
