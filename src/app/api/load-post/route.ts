import { NextResponse } from "next/server";
import axios from "axios";
import { JobPost } from "@/Types/Types";
import { db } from "@/lib/db/dbConent";

export async function GET() {
  try {
    // const res = await fetch("https://jsonfakery.com/jobs");
    const res = await axios.get("https://jsonfakery.com/jobs");

    // console.log(res);
    const data: JobPost[] = res.data || [];
    data.forEach((data) => {
      delete data.updated_at;
      delete data.created_at;

      delete data.id;
      if (typeof data.qualifications === "string") {
        try {
          data.qualifications = JSON.parse(data.qualifications);
        } catch (error) {
          console.error("Error parsing qualifications:", error);
          // Optionally, assign an empty array or handle the error
          data.qualifications = [];
        }
      }
    });
    // console.log(data.slice(0, 2));
    await db.jobs.createMany({
      data: data,
      skipDuplicates: true,
    });

    return NextResponse.json(
      { msg: "hello", data },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "error" });
  }
}
