FROM node

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install

COPY . /app

EXPOSE 4000 

CMD ["pnpm", "start"]
