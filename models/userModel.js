import { Mongoose } from "mongoose";

const userSchema = new Mongoose.Schema({

  username: {
    type: String,
    required: [true, "please provide a usename"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,

});

const User = Mongoose.models.users || Mongoose.model("users", userSchema);

export default User;