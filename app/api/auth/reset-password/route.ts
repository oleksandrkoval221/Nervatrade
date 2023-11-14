import User from "@/app/models/User";
import dbConnect from "@/app/utilities/dbConnect";
// @ts-ignore
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    User.updateOne({ email }, { password: hashedPassword })
      .then(result => console.log(result))
      .catch(error => console.error(error));

    return new NextResponse("Reset password successfully.", {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
