<template>
  <div class="card-team">
    <div class="img-stack">
      <MediaImage
        :asset="teamImage"
        width="461"
        height="500"
        loading="lazy"
      />
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
import MediaImage from '@/components/MediaImage.vue';

export default {
  name: 'TeamCard',
  components: {
    MediaImage,
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
      return this.member.content[0].image;
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
    margin-top: 13px;
    padding-left: 16px;

    .members-name {
      @extend h5;
      font-weight: 500;
      font-size: 1.6rem;
    }

    .members-title {
      font-size: 1rem;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
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
