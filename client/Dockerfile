FROM node

WORKDIR /app/client

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install

COPY . /app/client

EXPOSE 3000

CMD ["pnpm", "dev"]