FROM node:24-alpine

WORKDIR /app

# Instala as dependências primeiro para aproveitar o cache do Docker
COPY package.json yarn.lock ./
RUN yarn install

# Copia o restante do código
COPY . .

# Gera o client do Prisma
RUN yarn prisma generate

EXPOSE 3000

# Comando para iniciar em modo watch
CMD ["yarn", "run", "start:dev"]
