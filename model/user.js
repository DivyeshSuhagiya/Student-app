const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, 
      lowercase: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    userImage: {
      type: String,
      trim: true,
      default: "",
      required :true
    },
    imageId: { 
      type: String,
      trim: true,
      default: "",
      required :true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", UserSchema);