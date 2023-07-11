import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(request) {
  await connectToDatabase();
  // get param from url

  try {
    const data = await User.find();
    // console.log(data);
    // const users = data.json();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error);
  }
}
// export async function POST(request) {
//   await connectToDatabase();
//   const { name, email, password } = await request.body;
//   // console.log("name", name);
//   // console.log("email", email);

//   try {
//     const user = await User.create({
//       name,
//       email,
//       password,
//     });
//     // console.log("user", user);
//     return NextResponse.json({ user });
//   } catch (error) {
//     return NextResponse.error(error);
//   }
// }
