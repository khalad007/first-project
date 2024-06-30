import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bycrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// pre save middlewear / hook
userSchema.pre("save", async function (next) {
  // hasing password
  const user = this;
  user.password = await bycrypt.hash(
    user.password,
    Number(config.bycrypt_salt_round)
  );
  next();
});
// pre saved middlewear / hook       set empty string
userSchema.post("save", function (doc, next) {
  // console.log(this, "post hook: we saved our data ");
  doc.password = "";
  next();
});
export const User = model<TUser>("User", userSchema);
