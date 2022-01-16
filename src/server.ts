import fastify from "fastify";
import { main_app } from "./app";
import { PORT } from "./config";
import { getBrowser, getOS } from "./midlewares/enviroment.middleware";
const server = fastify({
    logger:true,
    disableRequestLogging: true
});

server.register(main_app)


server.listen(PORT)