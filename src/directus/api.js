//----------------------------------
// Imports
//----------------------------------
import i18n from '@/i18n';
import config from '@/directus/config';

//----------------------------------
// Constants
//----------------------------------
const { API_URL } = config;

//----------------------------------
// Internal Methods
//----------------------------------
const internal = {
  fetch: async (method, uri, parameters = null, body = null) => {
    const headers = new Headers({ Accept: 'application/json', 'Accept-language': i18n.locale });
    const url = new URL(`${API_URL}/items${uri}`);
    if (parameters !== null) {
      const keys = Object.keys(parameters);
      keys.forEach((key) => {
        url.searchParams.append(key, parameters[key]);
      });
    }
    // eslint-disable-next-line no-return-await
    return await window.fetch(url, {
      method, headers, credentials: 'same-origin', body: body ? internal.convertToFormData(body) : null,
    });
  },
  convertToFormData: (obj, form, namespace) => {
    const formData = form || new FormData();
    const objectKeys = Object.keys(obj);
    objectKeys.forEach((key) => {
      const formKey = namespace ? `${namespace}[${key}]` : key;
      if (obj[key] !== null && typeof obj[key] === 'object' && !(obj[key] instanceof File) && !(obj[key] instanceof Blob)) {
        internal.convertToFormData(obj[key], formData, formKey); // if object, but not a File, use recursivity
      } else {
        formData.append(formKey, obj[key]);
      }
    });
    return formData;
  },
};

export default {
  get: async (uri, parameters = null) => {
    const response = await internal.fetch('GET', uri, parameters);
    if (response.ok) {
      // eslint-disable-next-line no-return-await
      return await response.json();
    }
    return null;
  },

  post: async (uri, parameters = null, data = null) => {
    const response = await internal.fetch('POST', uri, parameters, data);
    if (response.ok) {
      try {
        // eslint-disable-next-line no-return-await
        return await response.json();
      } catch (err) {
        return response;
      }
    }
    return false;
  },
};
