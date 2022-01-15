import dotenv from "dotenv"


dotenv.config();

const checkEnv = (envVar: string)=>{
    if(!process.env[envVar]){
        throw new Error('Please define the Enviroment ${envVar}')

    }else{
        return process.env[envVar] as string
    }
}
 
export const PORT:number = parseInt(checkEnv("PORT"),10)