import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import formbody from "@fastify/formbody";
import cors from "@fastify/cors";
import multer from "fastify-multer";
import { connectDb } from "./database";


//ROUTES
import { userRoutes } from "./routes/user.routes";
import { ahorrosRoutes } from "./routes/CuentaAhorros.routes";
import { cdtRoutes } from "./routes/Cdt.routes";
import { movimientosRoutes } from "./routes/movimientos.routes";
import { creditRoutes } from "./routes/Credit.routes";
import { estadisticasRoutes } from "./routes/estadisticas.routes";
import { configRoutes } from "./routes/config.routes";
import { env } from "./configEnv";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

// const fastify = Fastify({ logger: true });

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();


fastify.register(connectDb);

fastify.register(cors, { origin: "*" });
fastify.register(formbody);
fastify.register(multer.contentParser);

//routes
fastify.register(userRoutes, { prefix: "/user" });
fastify.register(ahorrosRoutes, { prefix: "/ahorros" });
fastify.register(cdtRoutes, { prefix: "/cdt" });
fastify.register(movimientosRoutes, { prefix: "/movimientos" });
fastify.register(creditRoutes, { prefix: "/credit" });
fastify.register(estadisticasRoutes, { prefix: "/estadisticas" });
fastify.register(configRoutes, { prefix: "/config" });

const start = async () => {
  try {
    await fastify.ready();
    fastify.listen({ port: 4000, host: env.HOST });
    console.log("CONECTADO PUERTO", process.env.PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
