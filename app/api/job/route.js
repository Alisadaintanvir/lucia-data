import { NextResponse } from "next/server";
import { ContactsV5 } from "@/lib/models";
import connectDB from "@/lib/db";

export async function GET(req) {
  const url = new URL(req.url);
  const queryParams = url.searchParams;
  const query = queryParams.get("q");

  try {
    await connectDB();

    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const jobs = await ContactsV5.find({
      "_source.person_title": {
        $regex: `^${sanitizedQuery}`,
        $options: "i",
      },
    }).limit(5);

    return NextResponse.json({ status: 200, data: jobs });
  } catch (err) {
    console.log("Error fetching data: ", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
