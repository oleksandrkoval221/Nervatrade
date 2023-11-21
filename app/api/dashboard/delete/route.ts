import Dashboard from "@/models/Dashboard";
import dbConnect from "@/utilities/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export const DELETE = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const dash_id = searchParams.get('dash_id')

  await dbConnect();
  
  try {
    const deletedRow = await Dashboard.findOneAndDelete({ _id: dash_id });
    console.log('deletedRow == ', deletedRow);
    
    return new NextResponse("Deleted a selected row successfully.", {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
