<template>
  <div class="featured-wrapper">
    <title-view :title-text="$t('home.featured')"
                :btn-text="$t('home.seeAll')"
                @onclickBtn="onclickSeeAll"
    ></title-view>
    <div class="featured-books-wrapper">
      <div class="featured-book-item"
           v-for="(book, index) in data" :key="index"
           @click="showDetail(book)"
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
  import { getCategoryText } from '../../utils/store'
  import { storeHomeMixin } from '../../utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    components: {
      TitleView
    },
    props: {
      data: Array
    },
    methods: {
      onclickSeeAll () {
        console.log('see all')
        console.log(this.data)
      },
      getCategory (categoryText) {
        return getCategoryText(categoryText, this)
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
        flex: 1;
        width: 50%;
        display: flex;
        font-size: 12px;
        padding-bottom: px2rem(15);
        box-sizing: border-box;
        &:nth-child(odd) {
          padding-right: px2rem(10);
        }
        .book-img-wrapper {
          flex: 0 0 20%;
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
