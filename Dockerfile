ARG VUE_APP_API_URL=https://directus.example.com
ARG VUE_APP_PRERENDER_URL=https://prerender.example.com

FROM node:14 as build
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build

FROM nginx:latest as serve
ARG VUE_APP_API_URL
ARG VUE_APP_PRERENDER_URL
ENV VUE_APP_API_URL $VUE_APP_API_URL
ENV VUE_APP_PRERENDER_URL $VUE_APP_PRERENDER_URL
ENV VUE_APP_I18N_LOCALE=en-us
ENV VUE_APP_LANGUAGES=en-us
ENV VUE_APP_ZOHO_ENDPOINT=https://oitn.maillist-manage.eu/weboptin.zc

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx-default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build ./app/dist /var/www/html

EXPOSE 80
