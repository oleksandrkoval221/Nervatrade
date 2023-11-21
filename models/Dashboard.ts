import mongoose, { Schema } from "mongoose";
import User from "./User";

const DashboardSchema = new mongoose.Schema(
  {
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: User, 
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

export default mongoose.models.Dashboard || mongoose.model("Dashboard", DashboardSchema);
