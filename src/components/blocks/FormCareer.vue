<template>
  <div class="form-container">
    <form action="" v-if="!wasSubmitted && !submissionFailed">
      <div class="form-group">
        <div>
          <label for="name">{{$t('form.fullName')}}</label>
          <input type="text" name="name" :placeholder="$t('form.fullName')" v-model="formData.name" :class="{ 'error': $v.formData.name.$error }">
          <div class="error" v-if="!$v.formData.name.required && $v.formData.name.$error">{{$t('formErrors.required')}}</div>
          <div class="error" v-if="!$v.formData.name.minLength">min Length</div>
        </div>
        <div>
          <label for="portfoliourl">{{$t('form.portfolioUrl')}}</label>
          <input type="url" name="portfoliourl" :placeholder="$t('form.portfolioUrl')"
                 v-model="formData.portfoliourl">
        </div>
      </div>
      <div class="form-group">
        <div>
          <label for="name">{{$t('form.email')}}</label>
          <input type="email" name="email" :placeholder="$t('form.email')"
                 v-model="formData.email"
                 :class="{ 'error': $v.formData.email.$error }">
          <div class="error" v-if="!$v.formData.email.required && $v.formData.email.$error">{{$t('formErrors.required')}}</div>
        </div>
        <div>
          <label for="phone">{{$t('form.phone')}}</label>
          <input type="tel" name="phone" :placeholder="$t('form.phone')" id="phone"
                 v-model="formData.phone">
        </div>
      </div>
      <div class="form-group wide">
        <div>
          <label for="location">{{$t('form.location')}}</label>
          <input type="text" name="location" :placeholder="$t('form.location')"
                 v-model="formData.location">
        </div>
      </div>
      <div class="form-group wide">
        <div>
          <label for="name">{{$t('form.resume')}}</label>
          <input type="file" name="portfolio" placeholder="" @change="fileSelected">
          <small>{{$t('form.fileNotes')}}</small>
        </div>
      </div>
      <div class="form-group col">
        <label for="message">{{$t('form.message')}}</label>
        <textarea name="message" :placeholder="$t('form.message')"
                  v-model="formData.message"
                  :class="{ 'error': $v.formData.message.$error }">
          </textarea>
        <div class="error" v-if="!$v.formData.message.required && $v.formData.message.$error">{{$t('formErrors.required')}}</div>
      </div>
      <div class="form-group buttons">
        <Button class="secondary" icon="">
          <a>{{$t('form.cancel')}}</a>
        </Button>
        <Button class="primary" icon="" @click.native="submitForm()">
          <a>{{$t('form.send')}}</a>
        </Button>
      </div>
    </form>
    <div class="result-success" v-if="wasSubmitted">
      <SVGCheck />
      <p>{{$t('formSuccess')}}</p>
    </div>
    <div class="result-error" v-if="submissionFailed">
      <SVGError />
      <p>{{$t('formFailure')}}</p>
      <Button class="secondary" @click.native="reloadSite">
        <a>{{ $t('ctas.reload') }}</a>
      </Button>
    </div>
  </div>
</template>

<script>
import 'intl-tel-input/build/css/intlTelInput.css';
import { required, minLength } from 'vuelidate/lib/validators';
import intlTelInput from 'intl-tel-input';
import axios from 'axios';
import SVGCheck from '@/assets/svg/icon-checkmark.svg?inline';
import SVGError from '@/assets/svg/icon-close-circle.svg?inline';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'FormCareer',
  components: {
    SVGError,
    SVGCheck,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    jobId: Number,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      submissionFailed: false,
      wasSubmitted: false,
      formData: {
        name: '',
        email: '',
        portfoliourl: '',
        location: '',
        file: null,
        phone: '',
        message: '',
      },
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
      phone: {
        required,
      },
      message: {
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
    const input = document.querySelector('#phone');
    intlTelInput(input, {
      initialCountry: 'auto',
      geoIpLookup(callback) {
        fetch('http://ipinfo.io?token=3861074e846e78')
          .then((resp) => {
            const countryCode = (resp && resp.country) ? resp.country : 'ch';
            callback(countryCode);
          });
      },
    });
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
    fileSelected(e) {
      const file = e.target.files[0];
      this.formData.file = file;
      if (file.size > 5242880) {
        // eslint-disable-next-line no-alert
        alert('File too large. Max file size is 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (er) => {
        console.log(er);
        // this.formData.file = er.target.result;
      };
      reader.readAsDataURL(file);
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const form = new FormData();
        form.append('related_job', this.jobId);
        form.append('fullname', this.formData.name);
        form.append('portfolio_url', this.formData.portfoliourl);
        form.append('email', this.formData.email);
        form.append('phone', this.formData.phone);
        form.append('location', this.formData.location);
        form.append('message', this.formData.message);
        form.append('file', this.formData.file);
        const options = {
          method: 'POST',
          url: `${API_URL}/cce/applicants`,
          headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
          data: form,
        };
        axios.request(options)
          .then(() => {
            this.wasSubmitted = true;
          })
          .catch(() => {
            this.wasSubmitted = false;
            this.submissionFailed = true;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import '~scss/variables';

</style>
