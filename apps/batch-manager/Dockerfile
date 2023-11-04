# install dependencies and build
FROM node:20.9.0-bookworm AS build
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# deploy image, copy dependencies from build and source code from local
FROM node:20.9.0-bookworm-slim AS deploy
RUN apt-get update -y && apt-get install -y openssl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
