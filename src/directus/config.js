/* eslint-disable prefer-destructuring */
const ENV = window.ENV;
Object.keys(ENV).forEach((key) => {
  ENV[key] = ENV[key].indexOf('<!--') !== -1 ? null : ENV[key];
});
export default {
  API_URL: window.ENV?.VUE_APP_API_URL || process?.env.VUE_APP_API_URL,
  ZOHO_ENDPOINT: window.ENV?.VUE_APP_ZOHO_ENDPOINT || process?.env.VUE_APP_ZOHO_ENDPOINT,
  LANGUAGES: (window.ENV?.VUE_APP_LANGUAGES || process.env.VUE_APP_LANGUAGES).split(',').map((entry) => String(entry).trim()),
};
