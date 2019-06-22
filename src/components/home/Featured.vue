<template>
  <div class="featured-wrapper">
    <title-view :title-text="titleText"
                :btn-text="btnText"
                @onclickBtn="onclickSeeAll"
                v-if="data && data.length > 0"
    ></title-view>
    <div class="featured-books-wrapper">
      <div class="featured-book-item point"
           v-for="(book, index) in data" :key="index"
           @click="showBookDetail(book)"
      >
        <div class="book-img-wrapper">
          <img class="img" :src="book.cover" alt="">
        </div>
        <div class="book-info-wrapper">
          <div class="book-info title-big">{{book.title}}</div>
          <div class="book-info title-medium">{{book.author}}</div>
          <div class="book-info title-small">{{getCategory(book.categoryText)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleView from './Title'
  import { getTranslateCategoryText } from '../../utils/store'
  import { storeHomeMixin } from '../../utils/mixin'
  import { gotoList } from '../../utils/routerSkip'

  export default {
    mixins: [storeHomeMixin],
    components: {
      TitleView
    },
    props: {
      data: Array,
      titleText: {
        type: String,
        default: ''
      },
      btnText: {
        type: String,
        default: ''
      }
    },
    methods: {
      onclickSeeAll () {
        gotoList(this, {
          type: 'categoryRecommend',
          value: 'allFeatured'
        })
      },
      getCategory (categoryText) {
        return getTranslateCategoryText(categoryText, this)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/home";

  .featured-wrapper {
    .featured-books-wrapper {
      padding: 0 px2rem(10);
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .featured-book-item {
        width: 50%;
        display: flex;
        font-size: 12px;
        padding-bottom: px2rem(15);
        box-sizing: border-box;
        &:nth-child(odd) {
          padding-right: px2rem(10);
        }
        .book-img-wrapper {
          .img {
            width: px2rem(60);
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
    }
  }
</style>
