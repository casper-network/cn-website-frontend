# caspernetwork-website-frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

## Environment setup
To run and build the project, the following environment variables are required:
```
VUE_APP_I18N_LOCALE=en-us
VUE_APP_LANGUAGES=en-us
VUE_APP_API_URL=https://{DIRECTUS-URL}
VUE_APP_TEAM_API=https://{DIRECTUS-URL}/items/team_members?fields=*.*&sort%5B%5D=sort&limit=-1
VUE_APP_ASSET_URL=https://{DIRECTUS-URL}/assets/
VUE_APP_ITEMS_URL=https://{DIRECTUS-URL}/items/
VUE_APP_ZOHO_ENDPOINT=https://oitn.maillist-manage.eu/weboptin.zc
```

* `VUE_APP_I18N_LOCALE` should always be `en-us`.
* `VUE_APP_LANGUAGES` is a comma separated list of available languages Currently only `en-us` exists.
* Replace `{DIRECTUS-URL}` with the URL where Directus lives.
