import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String, 
      trim: true
    },
    skills: {
      type: [String], 
      default: []
    },
    avatar: { type: String, default: null }
  },
  { 
    timestamps: true 
  }
);

const Member = mongoose.models.Members || mongoose.model("Members", memberSchema);

export default Member;