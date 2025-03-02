FROM node:21-alpine3.19

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

# Instalar TypeORM globalmente para ejecutar migraciones
RUN npm i -g typeorm

EXPOSE 3002

CMD ["npm", "start"]