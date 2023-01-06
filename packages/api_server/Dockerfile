FROM node:17.3.0

ENV NODE_ENV=production
ENV DATABASE_URL="mongodb://mongo/sadboi?directConnection=true"

WORKDIR /app
COPY ./ /app

RUN npm install
CMD npx prisma db push && node server.mjs
