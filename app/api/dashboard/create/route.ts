import Dashboard from "@/models/Dashboard";
import dbConnect from "@/utilities/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
  const { dashboardName, user_id } = await request.json();
  await dbConnect();
  
  try {
    const newDashboard = new Dashboard({
      name: dashboardName,
      user_id
    });
  
    await newDashboard.save();

    return NextResponse.json(newDashboard);
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
