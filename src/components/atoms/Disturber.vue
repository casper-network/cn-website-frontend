<template>
  <div class="cta">
    <a :href="ctaURL" :target="ctaTarget" v-if="ctaType === 'external'">
      <div><slot></slot></div>
    </a>
    <router-link :to="ctaURL" v-else>
      <div><slot></slot></div>
    </router-link>
    <div class="blurred"></div>
  </div>
</template>

<script>
export default {
  name: 'Disturber',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    ctaTarget: {
      type: String,
      default: '_blank',
    },
    ctaURL: {
      type: String,
      default: 'https://www.google.com',
    },
    ctaType: {
      type: String,
      default: 'external',
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {};
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
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>

.cta {
  width: 218px;
  height: 218px;
  display: flex;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.5px;
  position: relative;
  overflow: visible;
  background: var(--color-white);
  transition: all 0.35s ease-in-out;
  transform: scale(1) rotate(15deg) translateZ(0);
  backface-visibility: hidden;

  div.blurred {
    position: absolute;
    width: 90%;
    height: 90%;
    background: white;
    border-radius: 100%;
    filter: blur(0px);
    border: 1px solid rgba(0, 36, 207, 0.2);
    transition: filter 0.75s ease;
  }

  /*&:before {
    filter: blur(0px);
    content: '';
    background: var(--color-white);
    border: 1px solid rgba(0, 36, 207, 0.2);
    width: 90%;
    height: 90%;
    position: absolute;
    top: 5%;
    left: 5%;
    z-index: 1;
    border-radius: 100%;
    transition: filter 0.35s ease-in-out;
  }*/

  a > div {
    /* Gradient_Vertikal */
    background: linear-gradient(31.33deg, #0024CF -11.89%, #D91C52 111.35%);
    -webkit-background-clip: text;
    position: sticky;
    width: 100%;
    z-index: 3;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0;
  }

  &:hover {
    div.blurred {
      filter: blur(40px);
    }

    a > div {
      filter: blur(0px);
    }
  }
}
</style>
