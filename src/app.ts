import { FastifyPluginAsync } from "fastify";
import { main_router } from "./routers/main_routers";

export const main_app:FastifyPluginAsync = async (app)=>{
    app.register(main_router)
}