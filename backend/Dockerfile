# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copia los package.json y package-lock.json e instala dependencias
COPY package*.json ./
RUN npm ci --only=production

# Copia el resto del código
COPY . .

# Expone el puerto en el que corre tu servidor
EXPOSE 5000

# Comando por defecto al lanzar el contenedor
CMD ["node", "index.js"]
