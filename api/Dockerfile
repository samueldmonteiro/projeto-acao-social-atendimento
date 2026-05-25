FROM node:24

WORKDIR /app

# Instala as dependências primeiro para aproveitar o cache do Docker
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Gera o client do Prisma
#RUN npx prisma generate

EXPOSE 3000

# Comando para iniciar em modo watch
CMD ["npm", "run", "start:dev"]
