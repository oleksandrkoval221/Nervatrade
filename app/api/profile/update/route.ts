import User from "@/models/User";
import dbConnect from "@/utilities/dbConnect";
// @ts-ignore
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { id, username, email, password } = await request.json();

  await dbConnect();

  try {
    const user = await User.findOne({ _id: id }).exec();
    if (user) {
      if (email) user.email = email;
      if (username) user.username = username;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 5);
        user.password = hashedPassword;
      }
    }
    await user.save();
    return new NextResponse("User has been updated", {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
