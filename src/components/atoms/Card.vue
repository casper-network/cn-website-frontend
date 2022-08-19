<template>
  <div>
    <div class="card">
      <a :href="`${cardData.url}`">
        <img :src="cardImage" alt="">
      </a>
      <div class="card-header">
        <img :src="logoImage" alt="" class="avatar">
        <div>
          <a :href="`${cardData.url}`">
            <h5>{{cardData.title}}</h5>
          </a>
        </div>
      </div>
      <div class="card-body">
        <p v-html="cardData.description"></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    cardData: Object,
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
  computed: {
    cardImage() {
      return (this.cardData.image) ? process.env.VUE_APP_ASSET_URL + this.cardData.image : '/mesh6.png';
    },
    logoImage() {
      return (this.cardData.image) ? process.env.VUE_APP_ASSET_URL + this.cardData.logo : '/mesh1.png';
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
@import '~scss/mixins';

.card {
  margin-bottom: 32px;

  img {
    transition: transform 0.35s ease-in-out;
    display: block;
    aspect-ratio: 16 / 9;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-input);
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-top: 32px;

    > div > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 8px 0;

      svg {
        margin-right: 8px;
        width: 17px;
      }
    }

    h5 {
      margin: 0;
      font-size: 24px;
    }

    p {
      @include style-body('small')
    }
  }

  .card-body {
    margin-top: 16px;

    p {
      @include style-body('medium')
    }
  }

  img.avatar {
    border-radius: 100%;
    width: 64px;
    height: 64px;
    display: block;
    margin-right: 16px;
    object-fit: cover;
  }

  &:hover {
    > a {
      > img {
        transform: translateY(12px);
      }
    }

    h5 {
      color: var(--color-blue);
    }
  }
}
</style>
