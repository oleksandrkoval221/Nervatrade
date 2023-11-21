import User from "@/models/User";
import dbConnect from "@/utilities/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
  const { token, password, user_id } = await request.json();
  await dbConnect();
  
  try {
   

    return new NextResponse("Reset password successfully.", {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
