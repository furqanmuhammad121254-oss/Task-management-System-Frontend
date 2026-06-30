import mongoose from "mongoose";

const Users = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  },
  isActive: {
    type: Boolean,
    default: true,
  }

}, { timestamps: true });

export default mongoose.model("user", Users);

