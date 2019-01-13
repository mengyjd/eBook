<template>
  <div class="category-book-wrapper">
    <div class="category-book">
      <title-view :title-text="getTranslateCategoryTextFromId(data.category)"
                  :btn-text="$t('home.seeAll')"
                  @onclickBtn="onclickSeeAll"
      ></title-view>
      <div class="category-books">
        <div class="book-item"
             v-for="(book, index) in data.list" :key="index"
        >
          <div class="book-img-wrapper">
            <img class="img" :src="book.cover">
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

  export default {
    mixins: [storeHomeMixin],
    components: {
      TitleView
    },
    props: {
      data: Object
    },
    methods: {
      onclickSeeAll () {
        console.log(this.data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/home";

  .category-book-wrapper {
    margin-top: px2rem(-10);

    .category-book {
      .category-books {
        padding: 0 px2rem(10);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .book-item {
    margin-bottom: px2rem(10);
    text-align: center;
    width: 22%;

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
