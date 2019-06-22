<template>
  <div class="categorys-wrapper">
    <title-view :title-text="$t('home.category')"
                :btn-text="$t('home.seeAll')"
                @onclickBtn="seeAll"
    ></title-view>
    <div class="category-list">
      <div class="category-item point"
           v-for="(book, index) in data" :key="index"
           @click="showCategoryBook(book.category)"
      >
        <div class="item-wrapper">
          <div class="text-wrapper">
            <div class="category-info title-medium">{{getTranslateCategoryTextFromId(book.category)}}</div>
            <div class="category-info title-small">{{getBookNum(book.num)}}</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img-front" :src="book.img1" alt="">
              <img class="img-back" :src="book.img2" alt="">
            </div>
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
      data: Array
    },
    methods: {
      getBookNum (num) {
        return this.$t('home.books').replace('$1', num)
      },
      showCategoryBook (categoryId) {
        gotoList(this, {
          type: 'categoryBooks',
          value: categoryName[categoryId]
        })
      },
      seeAll () {
        gotoList(this, {
          type: 'allCategoryBooks',
          value: 'allCategoryBooks'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/home";

  .categorys-wrapper {
    font-size: 12px;

    .category-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      box-sizing: border-box;

      .category-item {
        padding: px2rem(10);
        box-sizing: border-box;
        .item-wrapper {
          height: px2rem(100);
          background-color: #eeeeee;
          display: flex;

          .text-wrapper {
            flex: 1;
            height: 100%;
            flex-direction: column;
            @include center;

            .title-medium {
              font-weight: bold;
            }

            .title-small {
              color: #404040;
              margin-top: px2rem(5);
            }
          }

          .img-wrapper {
            position: relative;
            flex: 1;
            @include center;

            .img-group {
              position: relative;
              width: px2rem(60);
              height: 100%;

              .img-front {
                width: px2rem(45);
                z-index: 1100;
                left: 0;
                @include absColumnCenter;
              }

              .img-back {
                width: px2rem(35);
                right: 0;
                @include absColumnCenter;
              }
            }
          }
        }
      }
    }
  }

  /* Extra small devices (phones, 400px and down) */
  @media only screen and (max-width: 400px) {
    .category-item {
      width: 100%;
    }
  }

  /* Extra small devices (phones, 400px and up) */
  @media only screen and (min-width: 400px) {
    .category-item {
      width: 50%;
    }
  }

  @media only screen and (min-width: 992px) {
    .category-item {
      width: 32%;
    }
  }
</style>
