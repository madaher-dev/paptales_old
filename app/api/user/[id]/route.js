import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(request, { params }) {
  await connectToDatabase();
  const id = params.id;
  // console.log("id", id);
  try {
    const data = await User.find();
    // console.log(data);
    // const users = data.json();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
