import User from "@/models/User";
import dbConnect from "@/utilities/dbConnect";
// @ts-ignore
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { username, email, password } = await request.json();

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      return new NextResponse(`Email: ${email} already exists!`, {
        status: 500,
        statusText: `Email: ${email} already exists!`,
      });
    }
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
