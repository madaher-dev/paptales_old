import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";
import Character from "@/models/characterModel";

export async function GET(request) {
  await connectToDatabase();

  try {
    const data = await Character.find();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error);
  }
}
export async function POST(request) {
  await connectToDatabase();
  const { name, imageUrl } = await request.json();

  try {
    const character = await Character.create({
      name,
      imageUrl,
    });

    return NextResponse.json({ character });
  } catch (error) {
    return NextResponse.error(error);
  }
}
