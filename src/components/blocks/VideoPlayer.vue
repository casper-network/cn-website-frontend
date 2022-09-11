<template>
  <div class="video-container">
    <div class="video-overlay" @click="removeCoverAndPlay()">
      <img :src="(thumb) ? thumb : '/img/bg.webp'" alt="" class="yt-cover">
      <div>
        <div class="blur"/>
        <SVGIconPlay/>
      </div>
    </div>
    <p class="video-caption">{{ caption }}</p>
    <div class="video-modal" :class="{'active': isModalVisible}" :data-video-id="this.vpID">
      <div class="bg" @click="hideVideoModal()"></div>
      <div class="close-btn" @click="hideVideoModal()">
        <SVGClose/>
      </div>
      <div :id="vpID"></div>
    </div>
  </div>
</template>

<script>
import SVGIconPlay from '@/assets/svg/bigPlay.svg?inline';
import SVGClose from '@/assets/svg/close.svg?inline';

export default {
  name: 'VideoPlayer',
  components: {
    SVGIconPlay,
    SVGClose,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    videoId: String,
    caption: String,
    provider: String,
    thumb: String,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      isCoverVisible: true,
      isModalVisible: false,
      player: '',
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    vpID() {
      return `player-${this.videoId}`;
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
  created() {
  },
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
    removeCoverAndPlay() {
      this.isModalVisible = true;
      document.body.classList.add('no-scroll');
      console.log(document.getElementById(this.vpID));
      // this.isVideoPlaying = true;

      if (this.provider === 'youtube') {
        this.player = new window.YT.Player(document.getElementById(this.vpID), {
          videoId: this.videoId,
          events: {
            onReady: this.onPlayerReady,
            onStateChange: this.onPlayerStateChange,
          },
        });
      } else {
        this.player = new window.Vimeo.Player(document.getElementById(this.vpID), { id: this.videoId });
        this.player.play();
      }
    },
    hideVideoModal() {
      document.getElementById(this.vpID)
        .remove();
      this.isModalVisible = false;

      // eslint-disable-next-line no-unused-expressions
      (this.provider === 'youtube') ? this.player.stopVideo() : this.player.pause();

      const emptyVideoElement = document.createElement('div');
      emptyVideoElement.setAttribute('id', this.vpID);
      document.querySelector(`.video-modal[data-video-id="${this.vpID}"]`)
        .appendChild(emptyVideoElement);
      document.body.classList.remove('no-scroll');
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
    onPlayerReady(event) {
      event.target.playVideo();
    },
    onPlayerStateChange(event) {
      // eslint-disable-next-line no-undef
      if (event.data === window.YT.PlayerState.PLAYING) {
        this.isCoverVisible = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~scss/mixins';

div[data-vimeo-initialized="true"] {
  position: relative;
  width: 80%;
  height: auto;
  aspect-ratio: 16 / 9;
  margin: 0 auto;

  > iframe {
    width: 100% !important;
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
@import '~scss/mixins';

.video-container {
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  padding: 160px 0 0;

  @include breakpoint('sm') {
    padding: 80px 0 0;
  }
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 48px;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-teaser);
}

.video-overlay {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  border-radius: var(--border-radius-teaser);
  transform: translateY(0);
  padding-bottom: 56.25%;

  img {
    position: absolute;
    z-index: 1500;
    object-fit: cover;
    inset: 0;
    width: 100%;
    opacity: 1;
    transition: transform, 0.35s ease-in-out;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  > div {
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    width: 120px;
    height: 120px;
    z-index: 2000;
    cursor: pointer;
    backface-visibility: hidden;
    transform: translate3d(-50%, -50%, 0);

    @include breakpoint('sm') {
      width: 45px;
      height: 45px;
    }

    div.blur {
      background: white;
      transition: all 0.35s ease-in-out;
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      z-index: -1;
      border-radius: 100%;
      overflow: visible;
      transform: translateZ(0);
      backface-visibility: hidden;

      @include breakpoint('sm') {
        width: 100%;
        height: 100%;
      }
    }

    &:hover {
      div.blur {
        filter: blur(40px);
      }
    }

    svg {
    }
  }
}

.video-caption {
  margin-top: 16px;
  @include style-body('medium');
}

.video-modal {
  position: fixed;
  inset: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999;
  opacity: 0;

  div.bg {
    position: absolute;
    background: rgba(0, 0, 0, 0);
    width: 100%;
    height: 100%;
    z-index: 9999999;
  }

  div.close-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;

    svg {
      path {
        stroke: white;
      }
    }
  }

  &.active {
    pointer-events: all;
    background: rgba(0, 0, 0, 0.8);
    opacity: 1;
  }
}
</style>
