<template>
  <div class="category-book-wrapper">
    <div class="category-book">
      <title-view :title-text="data.categoryText"
                  :btn-text="$t('home.seeAll')"
                  @onclickBtn="showBookCategory"
      ></title-view>
      <div class="category-books wrapper-height">
        <div class="book-item point responsive-book-box"
             v-for="(book, index) in data.list" :key="index"
             @click="showBookDetail(book.id)"
        >
          <div class="book-img-wrapper">
            <img class="img" :src="book.cover" alt="">
          </div>
          <div class="book-content">
            <p class="book-info title-medium">{{book.title}}</p>
            <p class="book-info title-small">{{book.author}}</p>
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
      data: Object
    },
    methods: {
      showBookCategory () {
        gotoList(this, {
          type: 'categoryBooks',
          value: this.data.categoryText
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
      padding: 0 px2rem(10);
      .category-books {
        overflow-y: hidden;
        overflow-x: scroll;
        @include hiddenScrollbar;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
      }
    }
  }

  .book-item {
    text-align: center;
    margin: 0 10px;
    height: 160px;
    &:first-child {
      margin-left: 0;
    }

    .book-img-wrapper {
      width: 100%;
      height: 125px;

      .img {
        width: 100%;
        height: 100%;
      }
    }

    .book-content {
      .book-info {
        line-height: 18px;
      }
      .title-medium {
        font-weight: bold;
      }
    }
  }
</style>
