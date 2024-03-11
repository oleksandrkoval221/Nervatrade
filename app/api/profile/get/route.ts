import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/utilities/dbConnect";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    const user = await User.findOne({ _id: id });
    return NextResponse.json(user)
  } catch (err:any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}