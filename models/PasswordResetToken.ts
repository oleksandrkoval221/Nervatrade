import mongoose, { Schema } from "mongoose";
import User from "./User";

const PasswordResetTokenSchema = new mongoose.Schema(
  {
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: BigInt,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.PasswordResetToken || mongoose.model("PasswordResetToken", PasswordResetTokenSchema);
