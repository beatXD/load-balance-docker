# Install dependencies only when needed
FROM node:16.14.0 AS deps
WORKDIR /src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN yarn install

# Rebuild the source code only when needed
FROM node:16.14.0 AS builder
WORKDIR /src/app
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
COPY --from=deps /src/app/node_modules ./node_modules
RUN yarn run build


# Copy all the files and run
FROM node:16.14.0 AS runner
WORKDIR /src/app
ENV NODE_ENV development
COPY --from=builder /src/app/node_modules ./node_modules
COPY --from=builder /src/app/package.json package.json
COPY --from=builder /src/app/tsconfig.json tsconfig.json
COPY --from=builder /src/app/dist ./dist

EXPOSE 9001

CMD [ "yarn" , "start"]

