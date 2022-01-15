# fastify-plugins
1. [Arrancar yarn ](#schema1)
1. [Añadir typescript y ts-node-dev ](#schema2)
1. [Añadir el script para que compile Typescript y ejecutarlo ](#schema3)
1. [Configurar eslint ](#schema4)
1. [Añadir nuestras reglas a eslint ](#schema5)
1. [Variables de entorno ](#schema6)
1. [Arrancar yarn ](#schema1)




<hr>

<a name="schema1"></a>

# 1 Arrancar yarn
~~~bash
yarn init -y
~~~
<hr>

<a name="schema2"></a>

# 2 Añadir paquetes necesarios
~~~
yarn add typescript ts-node-dev eslint  fastify
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
yarn build tsc --init
~~~


<hr>

<a name="schema4"></a>

# 4 Configurar eslint
~~~bash
yarn run eslint --init
~~~

Después de esto hay que borrar la carpeta node-modules
y volver a instalar yarn
~~~bash
yarn install
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
yarn add dotenv
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