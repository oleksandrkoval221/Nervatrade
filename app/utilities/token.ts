import PasswordResetToken from "@/app/models/PasswordResetToken";
import dbConnect from "@/app/utilities/dbConnect";
import { generateRandomString, isWithinExpiration } from "lucia/utils";
import mongoose, { Schema } from "mongoose";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generatePasswordResetToken = async (userId: any) => {
  await dbConnect();

  const storedUserTokens = await PasswordResetToken.find({ user_id: userId });
  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // check if expiration is within 1 hour
      // and reuse the token if true
      return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken) return reusableStoredToken.id;
  }
  const token = generateRandomString(63);
  const newToken = new PasswordResetToken({
    token,
    expires: new Date().getTime() + EXPIRES_IN,
    user_id: userId,
  });
  await newToken.save();
  return token;
};

export const validatePasswordResetToken = async (token: string) => {
  await dbConnect();

  const storedToken = await PasswordResetToken.findOneAndDelete({ token });
  if (!storedToken) throw new Error("Invalid token");
  const tokenExpires = Number(storedToken.expires);
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Expired token");
  }
  return storedToken.user_id;
};
