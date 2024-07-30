import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { ContactsV5 } from "@/lib/models";

export async function GET(req) {
  // if (!user) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const url = new URL(req.url);
  const queryParams = url.searchParams;

  const query = {};
  const limit = parseInt(queryParams.get("limit")) || 20;
  const page = parseInt(queryParams.get("page")) || 1;

  if (queryParams.has("country")) {
    const countries = queryParams.getAll("country");
    query["_source.person_location_country"] = { $in: countries };
  }

  try {
    await connectDB();

    const data = await ContactsV5.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ status: 200, data });
  } catch (err) {
    console.log("Error fetching data: ", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
