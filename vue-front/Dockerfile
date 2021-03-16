FROM node:lts-alpine as build

ENV VUE_APP_HOST=${HOST}
ENV VUE_APP_PORT=${PORT}
ENV VUE_APP_API_HOST=${API_HOST}
ENV VUE_APP_API_PORT=${API_PORT}
ENV VUE_APP_REDDIT_CLIENT_ID=${REDDIT_ID}
ENV VUE_APP_GITHUB_CLIENT_ID=${GITHUB_ID}
ENV VUE_APP_SPOTIFY_CLIENT_ID=${SPOTIFY_ID}

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY babel.config.js package.json package-lock.json tsconfig.json vue.config.js .eslintrc.js ./
COPY src ./src/
COPY public ./public/
RUN npm run build

FROM nginx:stable-alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
