FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx nx build:web

FROM node:20-alpine as production
ENV NODE_ENV=production

USER node
WORKDIR /app

COPY --from=development /app/dist/apps/web ./
RUN npm install --only=production

CMD ["npm", "run", "start"]