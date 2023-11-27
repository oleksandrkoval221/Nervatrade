import { NextRequest, NextResponse } from "next/server";
import DashLayout from "@/models/DashLayout";
import dbConnect from "@/utilities/dbConnect";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url)
  const user_id = searchParams.get('user_id')
  const dash_id = searchParams.get('dash_id')

  try {
    const layouts = await DashLayout.findOne({ user_id, dash_id });
    return NextResponse.json(layouts)
  } catch (err:any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}