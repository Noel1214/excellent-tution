import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a usename"],
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "please provide a phone number"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: "",
  },
  fee: {
    type: String,
    default: "",
  },
  isFeePaid: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;