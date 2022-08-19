<template>
  <div class="page-privacy-policy">
    PRIvacy Policy
  </div>
</template>

<script>
// import { HTTP } from '@/utils/http-common';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      data: '',
      listData: [
        'Category 01',
        'Category 02',
        'Category 03',
      ],
      glideData: [
        'http://placeimg.com/1024/768/any',
        'http://placeimg.com/1024/768/sepia',
        'http://placeimg.com/1024/768/people',
        'http://placeimg.com/1024/768/any',
        'http://placeimg.com/1024/768/sepia',
        'http://placeimg.com/1024/768/sepia',
        'http://placeimg.com/1024/768/sepia',
        'http://placeimg.com/1024/768/sepia',
        'http://placeimg.com/1024/768/sepia',
      ],
    };
  },
  mounted() {
    // eslint-disable-next-line valid-typeof
    if (typeof this.$options.components.Hero === 'object') {
      this.$store.commit('changeNavigationTintState', 'light');
    } else {
      this.$store.commit('changeNavigationTintState', 'dark');
    }
    /* HTTP.get('posts')
      .then((response) => {
        this.posts = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      }); */
  },
};
</script>
<style lang="scss">
.kitchensink {
  display: flex;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
  border: 1px dashed var(--color-blue);
  padding: 20px;

  &.--h {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 2rem;
    border: 1px dashed var(--color-blue);
    padding: 20px;
  }

  &.--block {
    display: block;
  }
}
</style>
