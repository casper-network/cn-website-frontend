<template>
  <div class="block-video-collection">
    <div class="container">
      <div class="block-video-collection__title">
        <h2 v-html="blockTitle"></h2>
        <!--        <Button class="secondary">
                  <router-link :to="`/videos`">
                    View All
                  </router-link>
                </Button>-->
      </div>
      <div class="block-video-collection-body">
        <VideoPlayer
          class="vp-ow"
          v-for="(video, videoKey) in videoItems"
          :key="videoKey"
          :thumb="video.thumbnail"
          :provider="video.service"
          :video-id="video.id"
          :caption="video.caption"
        />
<!--        <Button class="secondary">
          <router-link :to="`/videos`">
            View All
          </router-link>
        </Button>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoCollection',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    blockTitle: {
      type: String,
      default: '<b>Learn fast</b> with our videos',
    },
    videoItems: {
      type: Array,
      default() {
        return [];
      },
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
  mounted() {
    const scripts = [
      'https://www.youtube.com/iframe_api',
      'https://player.vimeo.com/api/player.js',
    ];

    if (document.querySelector('div.video-container')) {
      scripts.forEach((script) => {
        const tag = document.createElement('script');
        tag.setAttribute('src', script);
        if (script.includes('youtube')) {
          tag.setAttribute('id', 'youtube-api');
        } else {
          tag.setAttribute('id', 'vimeo-api');
        }
        document.head.appendChild(tag);
      });
    }
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
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';

.block-video-collection {
  background: #f5f5f5;
  padding-top: 80px;
  padding-bottom: 80px;
  margin-top: 160px;

  @include breakpoint('sm') {
    margin-top: 45px;
  }

  .container {
    flex-direction: column;
  }
}

.block-video-collection__title {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 42px 0;

  h2 {
    margin: 0;
  }

  .btn {
    display: block;
  }

  @include breakpoint('sm') {
    .btn {
      display: none;
    }
  }
}

.block-video-collection-body {
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  gap: 32px;

  .btn {
    display: none;
  }

  ::v-deep .video-overlay {
    > div,
    > div::before {
      width: 65px;
      height: 65px;

      &:hover {
        filter: blur(10px);
      }
    }
  }

  @include breakpoint('sm') {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-template-columns: repeat(1, minmax(300px, 1fr));
    gap: 32px;

    .btn {
      display: block;
    }
  }
}

.vp-ow {
  padding: 0;

  @include breakpoint('sm') {
    padding: 0;
  }
}
</style>
