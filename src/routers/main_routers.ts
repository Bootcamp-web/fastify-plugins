import { FastifyPluginAsync } from "fastify"
import { getBrowser, getOS } from "../midlewares/enviroment.middleware"





export const main_router:FastifyPluginAsync = async(app)=>{

app.get("/",async(request,reply)=>{
    return {browser:getBrowser(request), os:getOS(request)}


})
}