# Imagen base oficial de Node.js
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar el package.json de server y lockfile
COPY server/package*.json ./server/

# Copiar todo el código del monorepo (incluye server/)
COPY . .

# Establecer el directorio de trabajo dentro del contenedor para instalar dependencias
WORKDIR /app/server

# Instalar las dependencias comunes (de todos los microservicios)
RUN npm install

# Establecer el working dir del microservicio específico
WORKDIR /app/server

# Exponer el puerto correspondiente
EXPOSE 3000

# Comando de arranque del microservicio (ajústalo si usas otro archivo de entrada)
CMD ["node", "app.js"]
