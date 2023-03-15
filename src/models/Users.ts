import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role?: string;
  matchPassword(password: string): boolean;
}

const { Schema, model } = mongoose;

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
    },

    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["client", "employee", "admin"],
      default: "client",
    },
  },
  {
    timestamps: true,
  }
);

ClientSchema.methods.matchPassword = function (this:IUser,password:string) {
  return bcrypt.compareSync(password, this.password);
};

export const clientModel = model<IUser>("client", ClientSchema);
