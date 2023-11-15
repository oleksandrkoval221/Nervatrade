import User from "@/models/User";
import dbConnect from "@/utilities/dbConnect";
// @ts-ignore
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { validatePasswordResetToken } from "@/utilities/token";


export const POST = async (request: NextRequest) => {
  const { token, password, user_id } = await request.json();

  await dbConnect();
  
  try {
    const userId = await validatePasswordResetToken(token);

    const hashedPassword = await bcrypt.hash(password, 5);

    User.updateOne({ _id: userId }, { password: hashedPassword })
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
