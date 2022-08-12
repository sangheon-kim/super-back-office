FROM node

WORKDIR /app/server

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install

COPY . /app/server

EXPOSE 4000 

CMD ["pnpm", "start"]
