ARG CUSTOM_DIRECTUS_URL=directus.example.com
ARG CUSTOM_PRERENDER_URL=prerender.example.com

FROM node:14 as build
WORKDIR /app
ARG CUSTOM_DIRECTUS_URL
ARG CUSTOM_PRERENDER_URL
ENV VUE_APP_DIRECTUS_URL=$CUSTOM_DIRECTUS_URL
ENV VUE_APP_PRERENDER_DOMAIN=$CUSTOM_PRERENDER_URL
ENV VUE_APP_I18N_LOCALE=en-us
ENV VUE_APP_LANGUAGES=en-us
ENV VUE_APP_API_URL=https://$VUE_APP_DIRECTUS_URL
ENV VUE_APP_TEAM_API=https://$VUE_APP_DIRECTUS_URL/items/team_members?fields=*.*&sort%5B%5D=sort&limit=-1
ENV VUE_APP_ASSET_URL=https://$VUE_APP_DIRECTUS_URL/assets/
ENV VUE_APP_ITEMS_URL=https://$VUE_APP_DIRECTUS_URL/items/
ENV VUE_APP_ZOHO_ENDPOINT=https://oitn.maillist-manage.eu/weboptin.zc

COPY . /app
RUN yarn install
RUN yarn build

FROM nginx:latest as serve
ARG CUSTOM_DIRECTUS_URL
ARG CUSTOM_PRERENDER_URL
ENV CUSTOM_DIRECTUS_URL $CUSTOM_DIRECTUS_URL
ENV CUSTOM_PRERENDER_URL $CUSTOM_PRERENDER_URL

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx-default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build ./app/dist /var/www/html

EXPOSE 80
