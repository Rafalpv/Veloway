# Usamos Node 20.18.1 en base
FROM node:20.18.1

# Creamos directory de trabajo
WORKDIR /usr/src/app

# Copiamos package files primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install --production

# Finalmente copiamos el resto de archivos
COPY . .

# Exponemos el puerto en el que corre el microservicio
EXPOSE 5001

# Arrancamos el microservicio
CMD ["node", "auth.service.js"]
