FROM node:alpine as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN npx browserslist@latest --update-db && rm -rf node_modules && yarn install --production=true --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn build

CMD ["yarn", "serve"]

FROM base as production
