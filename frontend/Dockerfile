# Usar una imagen ligera de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código del proyecto
COPY . .

# Exponer el puerto que usa Vite
EXPOSE 5173

# Comando por defecto para ejecutar Vite
CMD ["npm", "run", "dev", "--", "--host"]
