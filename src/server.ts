import fastify from "fastify";
import { PORT } from "./config";
import { getBrowser, getOS } from "./midlewares/enviroment.middleware";
const server = fastify({
    logger:true,
    disableRequestLogging: true
});



server.get("/",async(request,reply)=>{
    return {browser:getBrowser(request), os:getOS(request)}


})

server.listen(PORT)