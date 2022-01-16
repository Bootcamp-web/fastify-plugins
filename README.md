# fastify-plugins
1. [Arrancar npm](#schema1)
1. [Añadir typescript y ts-node-dev ](#schema2)
1. [Añadir el script para que compile Typescript y ejecutarlo ](#schema3)
1. [Configurar eslint ](#schema4)
1. [Añadir nuestras reglas a eslint ](#schema5)
1. [Variables de entorno ](#schema6)
1. [7 Comprobando las variables de entorno](#schema7)
1. [Creando un ENUM para ver los exploradores y creamos el archivo `enviroment.middleware.ts`](#schema8)




<hr>

<a name="schema1"></a>

# 1 Arrancar npm
~~~bash
npm init -y
~~~
<hr>

<a name="schema2"></a>

# 2 Añadir paquetes necesarios
~~~
npm install typescript ts-node-dev eslint  fastify
~~~

<hr>

<a name="schema3"></a>

# 3 Añadir el script para que compile Typescript y ejecutarlo
~~~js
 "scripts": {
    "build": "tsc"
  },
~~~
~~~bash
npm build tsc --init
~~~


<hr>

<a name="schema4"></a>

# 4 Configurar eslint
~~~bash
npm run eslint --init
~~~


<hr>

<a name="schema5"></a>

# 5 Añadir nuestras reglas a eslint
~~~js
  "rules": {
		"quotes": ["error", "double"],
		"no-console": "off",
		"indent": ["error", "tab"],
		"allowIndentationTabs": true
	}
~~~


<hr>

<a name="schema6"></a>

# 6 Variables de entorno
Instalar  dotenv, que nos permite controlar las variables de entrono
~~~
npm install add dotenv
~~~
Creamos el  archivo `.env` y lo metemos en el   `.gitignore` porque esa variables de entorno pueden contener datos privados y que no deben conocer nadie.
Para trabajar con las variables de entrono nos creamos un archivo `config.ts`
- `config.ts`
~~~js
import dotenv from "dotenv"
dotenv.config();

 
export const PORT = process.env.PORT || 3000
~~~
- `server.ts`
~~~js
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
~~~

<hr>

<a name="schema7"></a>

# 7 Comprobando las variables de entorno
Modificamos el achivo `config.ts` con la función `checkEnv` que comprueba que haya en el `.env`un variable PORT y sino le asigna 3000
~~~js
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
~~~
<hr>

<a name="schema8"></a>

# 8 Creando un ENUM para ver los exploradores y creamos el archivo `enviroment.middleware.ts`
- Modificamos el `server.ts`
~~~ts
export enum BROWSER {
    CHROME = "Chrome",
    SAFARI = "Safari",
    FIREFOX = "Firefox",
    POSTMAN = "Postman",
    UNKNOWN = "Unknown"
}
export const getBrowser = (request:any):BROWSER=>{
    const userAgent = request.headers["user-agent"]
    console.log(userAgent)
    let browser: BROWSER = BROWSER.UNKNOWN
    if (userAgent) {
        if (userAgent.includes("Chrome")) {
            browser = BROWSER.CHROME;
        } else if (userAgent.includes("Safari")) {
            browser = BROWSER.SAFARI;
        } else if (userAgent.includes("Firefox")) {
            browser = BROWSER.FIREFOX
        } else if (userAgent.includes("Postman")) {
            browser = BROWSER.POSTMAN
        } else {
            browser = BROWSER.UNKNOWN
        }
    }
    return browser
}


server.get("/",async(request,reply)=>{
    return {browser:getBrowser(request)}


})
~~~
- Refactorizamos y creamos el archivo `enviroment.middleware.ts`
~~~ts
import { FastifyRequest } from "fastify";
import { FastifyPluginAsync } from "fastify";
//import fp from 'fastify-plugin'



export enum OS {
    WINDOWS = "Windows",
    MAC = "Mac",
    UBUNTU = "Ubuntu",
    UNKNOWN = "Unknown",
}

export enum BROWSER {
    CHROME = "Chrome",
    SAFARI = "Safari",
    FIREFOX = "Firefox",
    POSTMAN = "Postman",
    UNKNOWN = "Unknown"
}

export const getBrowser = (request: FastifyRequest): BROWSER => {
    let browser: BROWSER = BROWSER.UNKNOWN;
    const userAgent = request.headers["user-agent"];
    if (userAgent) {
        if (userAgent.includes("Chrome")) {
            browser = BROWSER.CHROME;
        } else if (userAgent.includes("Safari")) {
            browser = BROWSER.SAFARI;
        } else if (userAgent.includes("Firefox")) {
            browser = BROWSER.FIREFOX
        } else if (userAgent.includes("Postman")) {
            browser = BROWSER.POSTMAN
        } else {
            browser = BROWSER.UNKNOWN
        }
    }
    return browser
}


export const getOS = (request: FastifyRequest): OS => {
    let os: OS = OS.UNKNOWN;
    const userAgent = request.headers["user-agent"];
    if (userAgent) {
        if (userAgent.includes("Mac")) {
            os = OS.MAC;
        } else if (userAgent.includes("Windows")) {
            os = OS.WINDOWS;
        } else if (userAgent.includes("Ubuntu")) {
            os = OS.UBUNTU
        }
    }
    return os
}
~~~