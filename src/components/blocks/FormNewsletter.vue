<template>
  <div class="form-container">
    <form action="" v-if="!submissionFailed && !wasSubmitted">
      <div class="form-group">
        <div>
          <label for="name">{{ $t('form.otherSelectLabel') }}</label>
          <Dropdown :filters="$t('form.newsletterOptions')"
                    dropdownLabel="dropdownLabel"
                    :class="{ 'error': $v.formData.categories.$error }"
                    @input="setNewsletterOptions"
          />
          <div class="error"
               v-if="!$v.formData.categories.required && $v.formData.categories.$error">
            {{ $t('formErrors.required') }}
          </div>
        </div>
        <div>
          <label for="name">{{ $t('form.name') }}</label>
          <input type="text" name="name" placeholder="Jean Claude" v-model="formData.name"
                 :class="{ 'error': $v.formData.name.$error }">
          <div class="error" v-if="!$v.formData.name.required && $v.formData.name.$error">
            {{ $t('formErrors.required') }}
          </div>
          <div class="error" v-if="!$v.formData.name.minLength">min Length</div>
        </div>
        <div>
          <label for="name">*E-Mail</label>
          <input type="email" name="email" placeholder="jc@casper.network"
                 v-model="formData.email"
                 :class="{ 'error': $v.formData.email.$error }">
          <div class="error" v-if="!$v.formData.email.required && $v.formData.email.$error">
            {{ $t('formErrors.required') }}
          </div>
        </div>
      </div>
      <div class="form-group wide">
        <div>
          <label for="location">Country</label>
          <v-select :options="countryList" v-model="formData.country"
                    :class="{ 'error': $v.formData.email.$error }"></v-select>
          <div class="error" v-if="!$v.formData.country.required && $v.formData.country.$error">
            {{ $t('formErrors.required') }}
          </div>
        </div>
      </div>
      <div class="form-group buttons">
        <Button class="primary" @click.native="submitForm()">
          <a>{{ $t('ctas.joinNow') }}</a>
        </Button>
      </div>
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
import { required, minLength } from 'vuelidate/lib/validators';
import 'vue-select/dist/vue-select.css';
import SVGCheck from '@/assets/svg/checkCircle.svg?inline';
import SVGError from '@/assets/svg/closeCircle.svg?inline';

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
      formData: {
        name: '',
        email: '',
        country: '',
        categories: [],
        phone: '',
        message: '',
      },
      countryList: this.$i18n.t('countries'),
      wasSubmitted: false,
      submissionFailed: false,
    };
  },
  validations: {
    formData: {
      name: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
      },
      country: {
        required,
      },
      categories: {
        required,
      },
    },
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {},
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
  mounted() {
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
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = `zcsffield=83025000007696057&CONTACT_CF5=${this.formData.categories.join(';')}&CONTACT_EMAIL=${this.formData.email}&FIRSTNAME=${this.formData.name}&CONTACT_CF6=${this.formData.country.label}&PRIVACY_POLICY=PRIVACY_AGREED&SIGNUP_SUBMIT_BUTTON=Join%20now&zc_trackCode=ZCFORMVIEW&submitType=optinCustomView&lD=1126f6cc30ef7e9d&emailReportId=&zx=14acd88297&zcvers=2.0&oldListIds=&mode=OptinCreateView&zcld=1126f6cc30ef7e9d&zctd=&zc_formIx=3z340768bb239465bfc3cef6071c7676282dea9ae06a24b9800b1d1620ebb18f0f&scriptless=yes`;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            const { status } = xhr;
            if (status === 0 || (status >= 200 && status < 400)) {
              this.wasSubmitted = true;
              // console.log(xhr.responseText);
            } else {
              this.submissionFailed = true;
            }
          }
        });

        xhr.open('POST', process.env.VUE_APP_ZOHO_ENDPOINT);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

        xhr.send(data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import '~scss/variables';
</style>
