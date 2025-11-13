import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["patient", "doctor", "admin"], default: "patient" },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
