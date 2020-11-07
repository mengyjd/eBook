<template>
  <div class="hot-recommend-wrapper">
    <div class="recommend-book-wrapper">
      <title-view :title-text="$t('home.recommend')"
                  :btn-text="$t('home.seeAll')"
                  @onclickBtn="onclickSeeAll"
      ></title-view>
      <div class="recommend-books wrapper-height">
        <div class="book-item point responsive-book-box"
             v-for="(book, index) in data" :key="index"
             @click="showBookDetail(book)"
        >
          <div class="book-img-wrapper">
            <img class="img" v-lazy="book.cover" alt="">
          </div>
          <div class="book-content">
            <div class="book-info title-medium">{{book.title}}</div>
            <div class="book-info title-small">{{getHaveRead(book.readers)}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleView from './Title'
  import { storeHomeMixin } from '../../utils/mixin'
  import { gotoList } from '../../utils/routerSkip'

  export default {
    mixins: [storeHomeMixin],
    components: {
      TitleView
    },
    props: {
      data: Array,
      titleText: String,
      btnText: String
    },
    methods: {
      onclickSeeAll () {
        gotoList(this, {
          type: 'categoryRecommend',
          value: 'allHotRecommend'
        })
      },
      getHaveRead (readers) {
        return this.$t('home.readers').replace('$1', readers)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/home";
  @import "../../assets/styles/responsive";

  .recommend-book-wrapper {
    .recommend-books {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 px2rem(5);
      box-sizing: border-box;
      overflow: hidden;
    }
  }

  .book-item {
    text-align: center;
    margin: 0 px2rem(10) px2rem(40) px2rem(10);

    .book-img-wrapper {
      width: 100%;

      .img {
        width: 100%;
      }
    }

    .book-content {
      .title-medium {
        font-weight: bold;
      }
    }
  }
</style>
