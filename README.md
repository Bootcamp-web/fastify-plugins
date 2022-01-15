# fastify-plugins
1. [Arrancar yarn ](#schema1)
1. [Añadir typescript y ts-node-dev ](#schema2)
1. [Añadir el script para que compile Typescript y ejecutarlo ](#schema3)
1. [Configurar eslint ](#schema4)
1. [Arrancar yarn ](#schema1)
1. [Arrancar yarn ](#schema1)
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
yarn add typescript ts-node-dev eslint  
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