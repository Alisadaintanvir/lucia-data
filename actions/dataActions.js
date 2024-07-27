"use server";

import connectDB from "@/lib/db";
import { User, ContactsV5 } from "@/lib/models";

const getData = async (query) => {
  await connectDB();

  const { countries } = query;

  const queryObject = {
    ...(countries && countries.length > 0
      ? { "_source.person_location_country": { $in: countries } }
      : {}),
  };

  const data = await ContactsV5.find(queryObject).limit(100);

  // const countData = await ContactsV5.countDocuments(queryObject);
  // console.log(countData);

  const plainData = data.map((doc) => doc.toObject());

  return plainData;
};

export { getData };
