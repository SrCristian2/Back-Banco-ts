import { FastifyReply, FastifyRequest } from "fastify";
import { response } from "../helpers/response";
import { IConfig } from "../interfaces/comun";
import { configModel } from "../models/config/config";

export const config = async (req:FastifyRequest<{Body:IConfig}>, reply:FastifyReply) => {
  try {
    const newConfig = new configModel({
      ...req.body,
    });

    await configModel.create(newConfig);

    response(reply, 201, true, newConfig, "config created");
  } catch (error:any) {
    response(reply, 500, false, "", error.message);
  }
};
