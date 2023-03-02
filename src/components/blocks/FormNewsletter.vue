<template>
  <div class="form-container">
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
          <div class="error" v-if="$v.formData[field.name].$error">
            {{ $t('formErrors.required') }}
          </div>
        </div>
      </div>
      <div class="form-group buttons">
        <Button class="primary" @click.native="submitForm()">
          <a>{{ $t('ctas.joinNow') }}</a>
        </Button>
      </div>
      <div class="form-group legal" v-html="$t('form.legal.newsletter')" />
    </form>
    <div class="result-success" v-if="wasSubmitted">
      <SVGCheck/>
      <p>{{ $t('formSuccess') }}</p>
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
  name: 'FormNewsletter',
  components: {
    SVGCheck,
    SVGError,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {},
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      definition: {
        groups: [],
        consents: null,
      },
      formData: {
      },
      countryList: this.$i18n.t('countries'),
      wasSubmitted: false,
      submissionFailed: false,
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
  },
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {},
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
    const response = await fetch(`${API_URL}/cce/newsletter`);
    this.definition = await response.json();
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
    reloadSite() {
      window.location.reload();
    },
    setNewsletterOptions(val) {
      this.formData.categories = val;
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

        const formData = {
          submittedAt: Date.now(),
          fields,
          context: {
            hutk: hubspotUtk !== '' ? hubspotUtk : null,
            pageUri: window.location.href,
            pageName: 'Newsletter',
          },
          legalConsentOptions: {
            consent: {
              consentToProcess: true,
              text: 'I agree to allow Casper Association to store and process my personal data.',
              communications: consents,
            },
          },
        };

        const response = await fetch(`${API_URL}/cce/newsletter`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.status >= 200 && response.status < 400) {
          this.wasSubmitted = true;
        } else {
          this.submissionFailed = true;
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
