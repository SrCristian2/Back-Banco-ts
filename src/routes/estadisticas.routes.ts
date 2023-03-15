import { estadisticas } from "../controllers/estadisticas.controller";
import { isAdmin, verifyToken } from "../middlewares/authorization";
const middleware = (req: any, reply: any, done: any) => {
  verifyToken(req, reply, done);
};
const admin = (req: any, reply: any, done: any) => {
  isAdmin(req, reply, done);
};

export const estadisticasRoutes = (fastify: any, opts: any, done: any) => {
  fastify.get("/", { preHandler: [middleware, admin] }, estadisticas);

  done();
};
