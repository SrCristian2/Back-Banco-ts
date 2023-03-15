import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "../configEnv";
import { response } from "../helpers/response";
import { clientModel } from "../models/Users";

export interface customRequest extends FastifyRequest {
  userId: string;
}

export const verifyToken = async (req:customRequest, reply:FastifyReply, done:any) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, env.SECRET, async (err, payload:any) => {
      if (err) {
        return response(reply, 401, false, null, "you are not authorized");
      }

      const user = await clientModel.findById({ _id: payload.user });
      if (!user) {
        return response(reply, 401, false, null, "you are not authorized");
      }

      req.userId = payload.user;
      done();
    });
  }

  if (!token) {
    return response(reply, 401, false, null, "you are not authorized");
  }
};

export const isEmployeeOrAdmin = async (req:customRequest, reply:FastifyReply, done:any) => {
  const user = await clientModel.findById(req.userId);
  if (user && user.role === "employee" || user!.role === "admin") {
    done();
  } else {
    return response(
      reply,
      400,
      false,
      "",
      "you are not authorized as employee y/o admin"
    );
  }
};

export const isAdmin = async (req:customRequest, reply:FastifyReply, done:any) => {
  const user = await clientModel.findById(req.userId);
  if (user && user.role === "admin") {
    done();
  } else {
    return response(reply, 400, false, "", "you are not authorized as admin");
  }
};
