<template>
  <div class="form-container">
    <form action="" v-if="!wasSubmitted || submissionFailed">
      <div class="form-group">
        <div>
          <label for="name">{{ $t('form.otherSelectLabel') }}</label>
          <CustomSelect :options="$t('form.contactCategories')" :dropdown-label="$t('form.otherSelectLabel')" @input="setContactCategory"></CustomSelect>
        </div>
        <div>
          <label for="name">Name</label>
          <input type="text" name="name" placeholder="name" v-model="formData.name"
                 :class="{ 'error': $v.formData.name.$error }">
          <div class="error" v-if="!$v.formData.name.required && $v.formData.name.$error">
            {{ $t('formErrors.required') }}
          </div>
          <div class="error" v-if="!$v.formData.name.minLength">min Length</div>
        </div>
        <div>
          <label for="name">E-Mail</label>
          <input type="email" name="email" placeholder="yourname@yourdomain.com"
                 v-model="formData.email"
                 :class="{ 'error': $v.formData.email.$error }">
          <div class="error" v-if="!$v.formData.email.required && $v.formData.email.$error">
            {{ $t('formErrors.required') }}
          </div>
        </div>
      </div>
      <div class="form-group col">
        <label for="message">Message</label>
        <textarea name="message" placeholder="Enter message" rows="6"
                  v-model="formData.message"
                  :class="{ 'error': $v.formData.message.$error }">
          </textarea>
        <div class="error" v-if="!$v.formData.message.required && $v.formData.message.$error">
          {{ $t('formErrors.required') }}
        </div>
      </div>
      <div class="form-group buttons">
        <Button class="primary" icon="" @click.native="submitForm()">
          <a>send</a>
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
import axios from 'axios';
import 'vue-select/dist/vue-select.css';
import SVGCheck from '@/assets/svg/checkCircle.svg?inline';
import SVGError from '@/assets/svg/closeCircle.svg?inline';

export default {
  name: 'FormContact',
  components: { SVGCheck, SVGError },
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
        location: '',
        category: null,
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
      category: {
        required,
      },
      name: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
      },
      message: {
        required,
        minLength: minLength(5),
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
  mounted() {},
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
      console.log('reload');
      window.location.reload();
    },
    setContactCategory(val) {
      this.formData.category = val;
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const form = new FormData();
        form.append('name', this.formData.name);
        form.append('category', this.formData.category);
        form.append('email', this.formData.email);
        form.append('message', this.formData.message);
        const options = {
          method: 'POST',
          url: `${process.env.VUE_APP_API_URL}/cce/contact`,
          headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
          data: form,
        };
        axios.request(options)
          .then((response) => {
            console.log(response.data);
            this.wasSubmitted = true;
          })
          .catch((error) => {
            console.error(error);
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
