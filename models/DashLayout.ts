import mongoose, { Schema } from "mongoose";
import User from "./User";
import Dashboard from "./Dashboard";

const DashLayoutSchema = new mongoose.Schema(
  {
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: User, 
      required: true,
    },
    dash_id: {
      type: Schema.Types.ObjectId, 
      ref: Dashboard, 
      required: true,
    },
    layout: {
      type: Object,
      required: true
    }
  },
  { timestamps: true },
);

export default mongoose.models.DashLayout || mongoose.model("DashLayout", DashLayoutSchema);
