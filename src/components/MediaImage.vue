<template>
  <img
    :src="computedUrl"
    :width="computedWidth"
    :height="computedHeight"
    :alt="computedAlt"
  />
</template>

<script>
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'MediaImage',
  components: {
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    asset: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: null,
    },
    width: {
      type: [Number, String],
      default: null,
    },
    height: {
      type: [Number, String],
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
      metadata: {},
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    computedUrl() {
      const { asset } = this;
      if (!this.isAbsoluteUrl) {
        return `${API_URL}/assets/${asset}`;
      }
      if (this.isAbsoluteUrl) {
        return asset;
      }
      return null;
    },
    isAbsoluteUrl() {
      const { asset } = this;
      return asset.indexOf('/') !== -1;
    },
    computedAlt() {
      const { metadata } = this;
      return this.alt || metadata?.description || metadata?.title;
    },
    computedWidth() {
      const { metadata } = this;
      return this.width || metadata?.width || 'auto';
    },
    computedHeight() {
      const { metadata } = this;
      return this.height || metadata?.height || 'auto';
    },
  },
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {
    asset(newval, oldval) {
      if (newval !== oldval) {
        this.retrieveMetadata();
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
  async created() {
    this.retrieveMetadata();
  },
  // beforeMount() {},
  // render(h) { return h(); },
  // mounted() {},
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
    async retrieveMetadata() {
      this.metadata = {};
      const { asset } = this;
      if (asset && !this.isAbsoluteUrl) {
        const response = await fetch(`${API_URL}/files/${asset}`);
        const { data } = await response.json();
        this.metadata = data;
      }
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss">
</style>
