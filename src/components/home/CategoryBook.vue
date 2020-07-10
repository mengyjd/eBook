<template>
  <div class="category-book-wrapper">
    <div class="category-book">
      <title-view :title-text="getTranslateCategoryTextFromId(data.category)"
                  :btn-text="$t('home.seeAll')"
                  @onclickBtn="showBookCategory"
      ></title-view>
      <div class="category-books wrapper-height">
        <div class="book-item point responsive-book-box"
             v-for="(book, index) in data.list" :key="index"
             @click="showBookDetail(book)"
        >
          <div class="book-img-wrapper">
            <img class="img" v-lazy="book.cover" alt="">
          </div>
          <div class="book-content">
            <div class="book-info title-medium">{{book.title}}</div>
            <div class="book-info title-small">{{book.author}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleView from './Title'
  import { storeHomeMixin } from '../../utils/mixin'
  import { categoryName } from '../../utils/store'
  import { gotoList } from '../../utils/routerSkip'

  export default {
    mixins: [storeHomeMixin],
    components: {
      TitleView
    },
    props: {
      data: Object
    },
    methods: {
      showBookCategory () {
        gotoList(this, {
          type: 'categoryBooks',
          value: categoryName[this.data.category]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/home";
  @import "../../assets/styles/responsive";

  .category-book-wrapper {
    margin-top: px2rem(-10);

    .category-book {
      .category-books {
        width: 100%;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: hidden;
      }
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
