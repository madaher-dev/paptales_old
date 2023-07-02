import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDatabase } from "@/utils/db";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { name, email, password } = await req.json();
    const hashed_password = await hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed_password,
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
