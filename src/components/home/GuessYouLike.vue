<template>
  <div class="guess-you-like-wrapper">
    <title-view :title-text="titleText"
                :btn-text="btnText"
                @onclickBtn="onclickChange"
    ></title-view>
    <div class="guess-you-like-book-wrapper">
      <div class="you-like-book-item point"
           v-for="(item, index) in data" :key="index"
           @click="showBookDetail(item)"
      >
        <div class="book-img-wrapper">
          <img class="img" :src="item.cover" alt="">
        </div>
        <div class="book-info-wrapper">
          <div class="book-info title-big">{{item.title}}</div>
          <div class="book-info title-medium">{{item.author}}</div>
          <div class="book-info title-small">{{getReason(item)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleView from './Title'
  import { storeHomeMixin } from '../../utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    components: {
      TitleView
    },
    props: {
      data: Array
    },
    data () {
      return {
        titleText: this.$t('home.guessYouLike'),
        btnText: this.$t('home.change')
      }
    },
    methods: {
      getReason (item) {
        return this.$t('home.readers').replace('$1', item.result)
      },
      onclickChange () {
        this.$emit('changeYouLike')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/home";

  .guess-you-like-wrapper {
    width: 100%;
    margin-top: px2rem(15);

    .guess-you-like-book-wrapper {
      width: 100%;
      padding: 0 px2rem(10);
      box-sizing: border-box;
    }
  }

  .you-like-book-item {
    width: 100%;
    display: flex;
    font-size: 12px;
    padding-bottom: px2rem(15);
    box-sizing: border-box;

    .book-img-wrapper {
      flex: 0 0 20%;

      .img {
        width: px2rem(70);
      }
    }

    .book-info-wrapper {
      flex: 1;
      @include ellipsis;

      .book-info {
        margin: 0 0 px2rem(10) px2rem(10);
      }
    }
  }
</style>
