import DashLayout from "@/models/DashLayout";
import dbConnect from "@/utilities/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
  const { layout, user_id, dash_id } = await request.json();
  await dbConnect();

  const query = { user_id, dash_id };
  const update = { layout };
  const options = { upsert: true, new: true };

  try {
    const result = await DashLayout.findOneAndUpdate(query, update, options);

    return NextResponse.json(result);
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
