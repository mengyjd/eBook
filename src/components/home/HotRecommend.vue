<template>
  <div class="hot-recommend-wrapper">
    <div class="recommend-book-wrapper">
      <title-view :title-text="$t('home.recommend')"
                  :btn-text="$t('home.seeAll')"
                  @onclickBtn="onclickSeeAll"
      ></title-view>
      <div class="recommend-books">
        <div class="book-item"
             v-for="(book, index) in data" :key="index"
        >
          <div class="book-img-wrapper">
            <img class="img" :src="book.cover">
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

  export default {
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
        console.log('see all')
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

  .recommend-book-wrapper {
    .recommend-books {
      display: flex;
      justify-content: space-between;
      padding: 0 px2rem(20);
      box-sizing: border-box;
    }
  }

  .book-item {
    text-align: center;
    width: 28%;

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
