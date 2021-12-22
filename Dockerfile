FROM node:14.15 AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN yarn install
COPY frontend .
RUN yarn build

FROM node:14.15
WORKDIR /app
COPY backend/package*.json backend/yarn.lock ./
RUN yarn install
COPY backend .
COPY --from=builder /app/build /app/public
CMD ["yarn", "start"]

