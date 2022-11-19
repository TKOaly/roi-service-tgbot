FROM node:18.12-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node . .

USER node

# run ts-node directly so npm doesn't swallow ctrl-c
CMD ["/app/node_modules/.bin/ts-node", "src/index.ts"]
