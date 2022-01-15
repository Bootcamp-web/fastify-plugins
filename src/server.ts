import fastify from "fastify";
import { PORT } from "./config";

const server = fastify({
    logger:true,
    disableRequestLogging: true
});
server.get("/",async(request,reply)=>{
    request.log.info("Hello from server");
    return {hello:"world"}
})

server.listen(PORT)