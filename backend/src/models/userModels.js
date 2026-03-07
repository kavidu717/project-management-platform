import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: "https://placehold.co/600x400",
        localpath: "",
      },
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // ✅ fixed
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // ✅ fixed
      trim: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "password is required"], // ✅ fixed
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
    },

    forgotPasswordToken: {
      type: String,
    },

    forgotPasswordExpiry: {
      type: Date,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ✅ mongoose hook: hash password before saving (no next() needed)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// ✅ compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

// ✅ access token (MUST return)
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, username: this.username },
    "super_secret_access_key_123456789",
    { expiresIn: "15m" }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    "super_secret_refresh_key_987654321",
    { expiresIn: "7d" }
  );
};

// ✅ temporary token
userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

  return {
    unHashedToken,
    hashedToken,
    tokenExpiry,
  };
};

export const User = mongoose.model("User", userSchema);