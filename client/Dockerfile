# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client/ .
RUN npm run build

# Etapa 2: Servir con Apache
FROM httpd:2.4-alpine

# Copiamos el build al directorio que Apache sirve
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

# Exponemos el puerto 80
EXPOSE 80

CMD ["httpd-foreground"]
