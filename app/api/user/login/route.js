import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

// export async function GET(request) {
//   await connectToDatabase();
//   // get param from url
//   console.log("hello 2");
//   const rawParams = request.url.split("?")[1];
//   // const params = qs.parse(rawParams);
//   console.log("email", rawParams);
//   try {
//     const data = await User.find();
//     // console.log(data);
//     // const users = data.json();

//     return NextResponse.json({ data });
//   } catch (error) {
//     return NextResponse.error(error);
//   }
// }
export async function POST(request) {
  await connectToDatabase();
  const { email } = await request.json();

  try {
    const user = await User.findOne({ email });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.error(error);
  }
}
