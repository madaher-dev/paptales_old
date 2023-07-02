import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(request, { params }) {
  await connectToDatabase();
  const id = params.id;
  // console.log("id", id);
  try {
    const data = await User.findById(id);
    // console.log(data);
    // const users = data.json();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error);
  }
}
export async function POST(request, { params }) {
  await connectToDatabase();

  const body = await request.json();

  const id = params.id;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          players: body,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
