<template>
  <div class="form-container" v-if="definition.groups.length > 0">
    <form action="" v-if="!submissionFailed && !wasSubmitted">
      <div class="form-group" v-for="(group, gidx) in definition.groups" :key="`group-${gidx}`" :class="{ wide: group.length <= 1}">
        <div v-for="(field, fidx) in group" :key="`group-${gidx}-field-${fidx}`">
          <label :for="field.name">{{ field.label }}</label>
          <template v-if="field.type === 'text'">
            <input
              type="text"
              :name="field.name"
              v-model="formData[field.name]"
              :class="{ 'error': $v.formData[field.name].$error }"
            >
          </template>
          <template v-if="field.type === 'textarea'">
            <textarea
              :name="field.name"
              v-model="formData[field.name]"
              :class="{ 'error': $v.formData[field.name].$error }"
            />
          </template>
          <template v-else-if="field.type === 'email'">
            <input
              type="email"
              :name="field.name"
              v-model="formData[field.name]"
              :class="{ 'error': $v.formData[field.name].$error }"
            >
          </template>
          <template v-else-if="field.type === 'dropdown'">
            <v-select
              :options="field.options"
              v-model="formData[field.name]"
              :reduce="obj => obj.value"
              :class="{ 'error': $v.formData[field.name].$error }"
            />
          </template>
          <template v-else-if="field.type === 'number'">
            <input
              type="number"
              :name="field.name"
              v-model="formData[field.name]"
              :class="{ 'error': $v.formData[field.name].$error }"
            >
          </template>
          <template v-else-if="field.type === 'radio'">
            <div class="radios" v-for="(option, oidx) in field.options" :key="`field-${fidx}-radio-${oidx}`">
              <input
                :id="`field-${fidx}-radio-${oidx}`"
                v-model="formData[field.name]"
                :value="option.value" type="radio"
              />
              <label :for="`field-${fidx}-radio-${oidx}`">
                {{ option.label }}
              </label>
            </div>
          </template>
          <div class="error" v-if="$v.formData[field.name].$error">
            {{ $t('formErrors.required') }}
          </div>
        </div>
      </div>
      <template v-if="consent">
        <div class="form-group confirm">
          <input
            id="confirm"
            v-model="consentGiven"
            type="checkbox" />
          <label for="confirm">
            {{ consent }}
          </label>
        </div>
        <div v-if="messages.privacy || messages.consent" class="form-group legal">
          <div v-if="messages.privacy" v-html="messages.privacy" />
          <div v-if="messages.consent" v-html="messages.consent" />
        </div>

        <div class="form-group buttons">
          <Button class="primary" :disabled="!consentGiven" @click.native="submitForm()">
            <a>{{ messages.submit }}</a>
          </Button>
        </div>
      </template>
      <template v-else>
        <div class="form-group buttons">
          <Button class="primary" @click.native="submitForm()">
            <a>{{ messages.submit }}</a>
          </Button>
        </div>
      </template>
    </form>
    <div class="result-success" v-if="wasSubmitted">
      <SVGCheck/>
      <div v-if="responseMessage" v-html="responseMessage" />
      <p v-else v-html="$t('form.newsletter.success')" />
    </div>
    <div class="result-error" v-if="submissionFailed">
      <SVGError/>
      <p>{{ $t('formFailure') }}</p>
      <Button class="secondary" @click.native="reloadSite">
        <a>{{ $t('ctas.reload') }}</a>
      </Button>
    </div>
  </div>
</template>

<script>
import 'intl-tel-input/build/css/intlTelInput.css';
import { required, email } from 'vuelidate/lib/validators';
import 'vue-select/dist/vue-select.css';
import SVGCheck from '@/assets/svg/icon-checkmark.svg?inline';
import SVGError from '@/assets/svg/icon-close-circle.svg?inline';
import config from '@/directus/config';
import Cookie from '../../utils/Cookie';

const { API_URL } = config;

export default {
  name: 'HubspotForm',
  components: {
    SVGCheck,
    SVGError,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    formId: {
      type: String,
      default: null,
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      definition: {
        groups: [],
        consents: [],
        messages: {},
      },
      formData: {
      },
      consentGiven: false,
      wasSubmitted: false,
      submissionFailed: false,
      responseMessage: null,
    };
  },
  validations() {
    const out = {};
    const fields = this.computedFields;
    fields.forEach((field) => {
      out[field.name] = {};
      if (field.required) {
        out[field.name] = { required };
      }
      if (field.type === 'email') {
        out[field.name] = { required, email };
      }
    });
    return { formData: out };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    computedFields() {
      const { groups } = this.definition;
      const fields = [];
      groups.forEach((group) => {
        group.forEach((field) => {
          fields.push(field);
        });
      });
      return fields;
    },
    messages() {
      const i18n = this.$i18n;
      const { messages } = this.definition;
      return {
        consent: null,
        privacy: null,
        submit: i18n.t('submit'),
        success: null,
        ...messages,
      };
    },
    consent() {
      const { consents } = this.definition;
      if (consents.length > 0) {
        const consent = consents[0];
        return (consent.label || '').replace(/<\/?[^>]+(>|$)/g, '');
      }
      return null;
    },
  },
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {
    consentGiven(value) {
      this.isValid = value;
    },
    formId(value) {
      if (value) {
        this.loadForm(value);
      }
    },
  },
  //---------------------------------------------------
  //
  //  Filter Properties
  //
  //---------------------------------------------------
  // filters: {},
  //---------------------------------------------------
  //
  //  Validation Properties
  //
  //---------------------------------------------------
  // validations: {},
  //---------------------------------------------------
  //
  //  Vue Lifecycle
  //
  //---------------------------------------------------
  // beforeCreate() {},
  // created() {},
  // beforeMount() {},
  // render(h) { return h(); },
  async mounted() {
    const { formId } = this;
    if (formId) {
      this.loadForm(formId);
    }
  },
  // beforeUpdate() {},
  // updated() {},
  // beforeDestroy() {},
  // destroyed() {},
  //---------------------------------------------------
  //
  //  Methods
  //
  //---------------------------------------------------
  methods: {
    async loadForm(id) {
      const response = await fetch(`${API_URL}/cce/form/?id=${id}`);
      this.definition = await response.json();
      console.log(this.definition);
    },
    reloadSite() {
      window.location.reload();
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
    async submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const hubspotUtk = Cookie.get('hubspotutk');
        const definition = this.computedFields;
        const fields = [];
        definition.forEach((def) => {
          fields.push({
            objectTypeId: def.id,
            name: def.name,
            value: this.formData[def.name],
          });
        });

        let consents = this.definition?.consents || [];
        consents = consents.map((consent) => ({
          value: true,
          subscriptionTypeId: consent.subscriptionTypeId,
          text: (consent.label || '').replace(/(<([^>]+)>)/ig, ''),
        }));

        let formData = {
          submittedAt: Date.now(),
          fields,
          context: {
            hutk: hubspotUtk !== '' ? hubspotUtk : null,
            pageUri: window.location.href,
            pageName: document.title,
          },
        };

        if (consents.length > 0) {
          formData = {
            ...formData,
            legalConsentOptions: {
              consent: {
                consentToProcess: true,
                text: 'I agree to allow Casper Association to store and process my personal data.',
                communications: consents,
              },
            },
          };
        }

        const response = await fetch(`${API_URL}/cce/form?id=${this.formId}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.status >= 200 && response.status < 400) {
          this.wasSubmitted = true;
          const data = await response.json();
          this.responseMessage = data?.data?.inlineMessage;
          this.$nextTick(() => {
            document.querySelector('.result-success').scrollIntoView();
          });
        } else {
          this.submissionFailed = true;
          this.$nextTick(() => {
            document.querySelector('.result-error').scrollIntoView();
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import '~scss/variables';
</style>
