<template>
  <div>
    <div class="card">
      <a :href="`${cardData.url}`" target="_blank">
        <img :src="cardImage" alt="">
      </a>
      <div class="card-header">
        <img :src="logoImage" alt="" class="avatar">
        <div>
          <a :href="`${cardData.url}`" target="_blank">
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
import config from '@/directus/config';

const { API_URL } = config;

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
      return (this.cardData.image) ? `${API_URL}/assets/${this.cardData.image}` : '/img/mesh6.webp';
    },
    logoImage() {
      return (this.cardData.image) ? `${API_URL}/assets/${this.cardData.logo}` : '/img/mesh1.webp';
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
      font-size: 26px;
      font-weight: 400;
    }

    p {
      @include style-body('small')
    }
  }

  .card-body {
    margin-top: 16px;

    p {
      @include style-body('medium')
      font-weight: 300;
    }
  }

  img.avatar {
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
