import jwt from "jsonwebtoken";
import { env } from "../configEnv";

export const generateToken = (payload:any) => {
  try {
    const token = jwt.sign(payload,env.SECRET, {
      expiresIn: "30d",
    });

    return token;
  } catch (error:any) {
    console.log("Error en generateToken", error.message);
  }
};
