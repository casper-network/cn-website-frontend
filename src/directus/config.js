export default {
  APP_ENV: process.env.VUE_APP_ENV,
  API_URL: process.env.VUE_APP_API_URL,
  LANGUAGES: process.env.VUE_APP_LANGUAGES.split(',').map((entry) => String(entry).trim()),
};
