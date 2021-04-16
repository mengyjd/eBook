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
             @click="showBookDetail(book.id)"
        >
          <div class="book-img-wrapper">
            <img class="img" :src="book.cover" alt="">
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
      flex-wrap: nowrap;
      justify-content: space-between;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      overflow-y: hidden;
      overflow-x: scroll;
      @include hiddenScrollbar;
    }
  }

  .book-item {
    text-align: center;
    margin: 0 10px 40px 10px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      padding-right: px2rem(10);
    }

    .book-img-wrapper {
      width: px2rem(70);

      .img {
        width: px2rem(70);
        height: px2rem(100);
      }
    }

    .book-content {
      .title-medium {
        font-weight: bold;
        margin-bottom: 5px;
      }
    }
  }
</style>
