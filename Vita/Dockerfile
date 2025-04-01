# Étape 1 : Build de l'application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

# Étape 2 : Serveur web
FROM nginx:1.25-alpine
COPY --from=builder /app/dist/vita-front /usr/share/nginx/html
COPY ./nginx-front.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]