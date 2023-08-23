FROM node:20-alpine
WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY .eslintrc.json next.config.js ./
COPY tailwind.config.ts postcss.config.js ./

#Folders
COPY app ./app
COPY components ./components
COPY hooks ./hooks
COPY providers ./providers
COPY public ./public
COPY types ./types
COPY utils ./utils

RUN npm run build

CMD ["npm", "start"]