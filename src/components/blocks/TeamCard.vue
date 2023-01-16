<template>
  <div class="card-team">
    <div class="img-stack">
      <img loading="lazy" :src="teamImage" alt="" width="461" height="500">
      <a :href="member.linkedin_url" target="_blank" v-if="member.linkedin_url">
        <SVGTeamLinkedin/>
      </a>
    </div>
    <div class="content-box">
      <p class="members-name">{{member.content[0].name}}</p>
      <p class="members-title">{{member.content[0].position}}</p>
    </div>
  </div>
</template>

<script>
import SVGTeamLinkedin from '@/assets/svg/teamlinkedin.svg?inline';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'TeamCard',
  components: {
    SVGTeamLinkedin,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    member: Object,
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
    teamImage() {
      return `${API_URL}/assets/${this.member.content[0].image}`;
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

<style lang="scss">
@import "@/assets/scss/typography.scss";

.card-team {
  div.content-box {
    margin-top: 26px;
    padding-left: 16px;

    .members-name {
      @extend h5;
      font-weight: 500;
    }

    .members-title {
      font-size: 20px;
      line-height: 32px;
      letter-spacing: 0.5px;
      margin-bottom: 32px;
    }
  }

  div.img-stack {
    position: relative;

    > img {
      width: 100%;
      height: 100%;
      aspect-ratio: 480 / 500;
      object-fit: cover;
    }

    svg {
      cursor: pointer;
      position: absolute;
      bottom: 20px;
      right: 20px;
      z-index: 200;

      &:hover {
        path:nth-child(1) {
          fill: var(--color-white);
        }
        path:nth-child(2) {
          fill: var(--color-blue);
        }
        path:nth-child(3) {
          fill: var(--color-white);
        }
      }
    }
  }
}
</style>
