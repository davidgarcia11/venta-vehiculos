# Usa nginx para servir archivos estáticos
FROM nginx:alpine

# Borra la configuración por defecto de nginx y copia tu frontend
RUN rm /usr/share/nginx/html/*
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# nginx ya trae el comando por defecto, no necesitas CMD
