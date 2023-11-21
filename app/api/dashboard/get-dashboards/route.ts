import { NextRequest, NextResponse } from "next/server";
import Dashboard from "@/models/Dashboard";
import dbConnect from "@/utilities/dbConnect";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url)
  const user_id = searchParams.get('user_id')

  try {
    const dashboards = await Dashboard.find({ user_id });
    return NextResponse.json(dashboards)
  } catch (err:any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}