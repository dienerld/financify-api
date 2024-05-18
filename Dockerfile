FROM node:21-alpine as base
ENV NODE_ENV=development

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app && \
apk add --no-cache fish bash


WORKDIR /home/node/app
USER node

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

## Development image
FROM base as development

## Build image
FROM base as build
ENV NODE_ENV=production

RUN yarn test && yarn build

## Production image
FROM node:21-alpine as prod
ENV NODE_ENV=production

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

USER node

WORKDIR /home/node/app

COPY --from=base /home/node/app/package.json /home/node/app/yarn.lock ./

RUN yarn install --prod --frozen-lockfile

RUN yarn prisma generate

COPY --from=build /home/node/app/dist ./dist

CMD ["node", "dist/main.js"]
