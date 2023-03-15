import { config } from "../controllers/config.controller";
import { isAdmin, verifyToken } from "../middlewares/authorization";

const middleware = (req: any, reply: any, done: any) => {
  verifyToken(req, reply, done);
};

const admin = (req: any, reply: any, done: any) => {
  isAdmin(req, reply, done);
};

export const configRoutes = (fastify: any, opts: any, done: any) => {
  fastify.post("/", { preHandler: [middleware, admin] }, config);
  done();
};
