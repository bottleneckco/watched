FROM node:9-alpine AS deps

WORKDIR /app
COPY package.json .
# COPY yarn.lock .

RUN apk --update add --virtual build_deps \
    build-base libc-dev linux-headers python2
RUN yarn
COPY . .
RUN yarn build

FROM nginx:1-alpine
WORKDIR /usr/share/nginx/html
COPY index.html .
COPY --from=deps /app/bundle.js .
