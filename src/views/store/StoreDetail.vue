<template>
  <div class="detail-wrapper">
    <detail-title :offsetY="bookInfoOffsetY"></detail-title>
    <scroll :top="45"
            :bottom="45"
            @onScroll="onScroll"
    >
      <book-info :cover="data ? data.cover : ''"
                 :fileName="data ? data.title : '-'"
                 :author="data ? data.author : '-'"
                 :desc="desc"
      ></book-info>
      <div class="book-copyright">
        <div class="title-big">{{$t('detail.copyright')}}</div>
        <div class="content">
          <div class="content-label">
            <span class="label">{{$t('detail.publisher')}}</span>
            <span class="label">{{$t('detail.category')}}</span>
            <span class="label">{{$t('detail.lang')}}</span>
            <span class="label">{{$t('detail.ISBN')}}</span>
          </div>
          <div class="content-label right">
            <span class="text">{{data ? data.publisher : '-'}}</span>
            <span class="text">{{data ? getCategory(data.categoryText) : '-'}}</span>
            <span class="text">{{data ? data.language : '-'}}</span>
            <span class="text">{{metadata ? metadata.identifier : '-'}}</span>
          </div>
        </div>
      </div>
    </scroll>
    <div class="tab-wrapper">
      <span class="tab-btn point"
            @click="showEbookRead">{{$t('detail.read')}}</span>
      <!--<span class="tab-btn">{{$t('detail.listen')}}</span>-->
      <span class="tab-btn point" @click="onAddOrRemoveFromShelf">{{addOrRemoveFromShelf}}</span>
    </div>
  </div>
</template>

<script>
  import DetailTitle from '../../components/detail/DetailTitle'
  import BookInfo from '../../components/detail/BookInfo'
  import Scroll from '../../components/common/Scroll'
  import { detail } from '../../api/store'
  import { getTranslateCategoryText } from '../../utils/store'
  import Epub from 'epubjs'
  import { storeShelfMixin } from '../../utils/mixin'
  import { gotoEbookRead } from '../../utils/routerSkip'
  import { saveBookShelf } from '../../utils/localStorage'

  global.ePub = Epub
  export default {
    mixins: [storeShelfMixin],
    components: {
      Scroll,
      DetailTitle,
      BookInfo
    },
    data () {
      return {
        bookInfoOffsetY: 0,
        desc: '',
        data: null,
        menuList: [],
        metadata: null
      }
    },
    computed: {
      isInBookShelf () {
        if (this.data && this.shelfList) {
          const flatShelfList = this.flatten(this.shelfList)
          const book = flatShelfList.filter(book => book.fileName === this.data.fileName)
          return book && book.length > 0
        } else {
          return false
        }
      },
      addOrRemoveFromShelf () {
        return this.isInBookShelf ? this.$t('detail.removeShelf') : this.$t('detail.addShelf')
      }
    },
    methods: {
      showEbookRead () {
        gotoEbookRead(this.data, this)
      },
      getCategory (categoryText) {
        return getTranslateCategoryText(categoryText, this)
      },
      onScroll (offsetY) {
        this.bookInfoOffsetY = offsetY
      },
      init () {
        const fileName = this.$route.query.fileName
        if (fileName) {
          detail(fileName).then(res => {
            if (res.status === 200 && res.data.error_code === 0 && res.data.data) {
              const data = res.data.data
              this.data = data
            } else {
              this.createSampleToast(res.data.msg)
            }
          })
        }
      },
      flatten (arr) {
        const shelfList = arr.map(book => {
          if (book.itemList) {
            return this.flatten(book.itemList)
          } else {
            return book
          }
        })
        return [].concat(...shelfList)
      },
      // 加入或移出书架
      async onAddOrRemoveFromShelf() {
        if (this.isInBookShelf) {
          // 如果已经在书架中, 从书架中移除
          await this.removeSelectedBook([this.data])
        } else {
          // 如果不在书架中, 添加到书架
          this.data.type = 1
          await this.addBooksToShelfList([this.data], this.shelfList)
          this.createSampleToast(this.$t('shelf.addToShelfSuccessful'))
        }
        saveBookShelf(this.shelfList)
      }
    },
    mounted () {
      this.init()
      if (!this.shelfList || this.shelfList.length === 0) {
        this.getShelfList()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .title-big {
    font-size: px2rem(24);
    font-weight: bold;
    margin-bottom: px2rem(20);
  }

  .detail-wrapper {
    width: 100%;
    height: 100%;
  }

  .book-copyright {
    padding: px2rem(15) px2rem(15);

    .content {
      display: flex;
      font-size: px2rem(16);
      color: #666;

      .content-label {
        display: flex;
        flex-direction: column;

        &.right {
          flex: 1;
          margin-left: px2rem(20);
        }

        .label {
          word-break: break-all;
          margin-bottom: px2rem(10);
        }

        .text {
          word-break: break-all;
          margin-bottom: px2rem(10);
        }
      }
    }
  }

  .menu-wrapper {
    padding: px2rem(10) px2rem(15);
    margin-bottom: px2rem(15);
    box-sizing: border-box;
    font-size: px2rem(16);

    .content {
      .menu-item {
        border-bottom: 1px solid #eee;

        .text {
          @include ellipsis();
          padding: px2rem(15) 0;
          box-sizing: border-box;
        }
      }
    }
  }

  .preview-title {
    margin: px2rem(5) 0 px2rem(-5) px2rem(15);
  }

  .tab-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    height: px2rem(45);
    font-size: px2rem(16);
    color: $color-blue;
    z-index: 1500;
    box-shadow: 0 px2rem(-2) px2rem(2) rgba(0, 0, 0, .2);

    .tab-btn {
      @include center;
    }
  }

  .loading-text {
    font-size: px2rem(16);
  }

  .preview-loading {
    margin: px2rem(15);
  }
</style>
