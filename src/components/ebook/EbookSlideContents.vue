<template>
  <div class="ebook-slide-contents"
       v-if="titleAndMenuVisible && menuSettingVisible === 1"
  >
    <!--搜索框-->
    <div class="slide-contents-search-wrapper">
      <div class="search-input-wrapper">
        <div class="icon-wrapper">
          <span class="icon-search"></span>
        </div>
        <input class="search-input"
               type="text"
               :placeholder="$t('book.searchHint')"
               @focus="showSearchPage"
               v-model="searchText"
               @keyup.enter.exact="search"
        >
      </div>
      <div class="search-cancel"
           @click="hideSearchPage"
           v-if="searchVisible"
      >{{$t('book.cancel')}}
      </div>
    </div>
    <!--图书信息-->
    <div class="slide-contents-book-wrapper"
         v-show="!searchVisible"
    >
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author">{{metadata.creator}}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{ progress }}%</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{ getReadTimeText() }}</div>
      </div>
    </div>
    <!--目录-->
    <scroll class="slide-contents-list"
            :top="156"
            :bottom="48"
            ref="scroll"
            v-show="!searchVisible"
    >
      <div class="slide-content-list-item point"
           :class="{selected: section === index}"
           v-for="(item, index) in navigation"
           :key="index"
           @click="displayContent(item.href)"
      >
        <span class="list-item-title"
              :style="contentItemStyle(item)"
        >{{ item.label }}</span>
        <span class="list-item-page">{{item.page}}</span>
      </div>
    </scroll>
    <!--搜索结果-->
    <scroll class="slide-search-list"
            :top="66"
            :bottom="48"
            v-show="searchVisible"
    >
      <div class="slide-search-item"
           v-for="(item, index) in searchList"
           :key="index"
           v-html="item.excerpt"
           @click="displayContent(item.cfi, true)"
      ></div>
    </scroll>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import Scroll from '../common/Scroll'
  import { px2rem } from '../../utils/utils'

  export default {
    components: {
      Scroll
    },
    mixins: [
      ebookMixin
    ],
    data () {
      return {
        searchVisible: false,
        searchText: '',
        searchList: null
      }
    },
    methods: {
      search() {
        if (this.searchText && this.searchText.length > 0) {
          this.doSearch(this.searchText).then(list => {
            this.searchList = list
            this.searchList.map(item => {
              item.excerpt = item.excerpt.replace(this.searchText,
                '<span class="text-search-text">' + this.searchText + '</span>'
              )
              return item
            })
          })
        }
      },
      doSearch (q) {
        return Promise.all(
          this.currentBook.spine.spineItems.map(
            section => section.load(this.currentBook.load.bind(this.currentBook))
              .then(section.find.bind(section, q))
              .finally(section.unload.bind(section))
          )
        ).then(results => Promise.all([].concat.apply([], results)))
      },
      displayContent (target, highlight = false) {
        this.hideTitleAndMenu()
        this.display(target)
        // this.hideSearchPage()
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
      },
      showSearchPage () {
        this.searchVisible = true
      },
      hideSearchPage () {
        this.searchVisible = false
        this.searchText = ''
        this.searchList = null
      },
      contentItemStyle (item) {
        return {
          marginLeft: `${item.level * px2rem(15)}rem`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .ebook-slide-contents {
    width: 100%;
    font-size: 0;

    .slide-contents-search-wrapper {
      display: flex;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      @include center;

      .search-input-wrapper {
        border: 1px solid #b8b9bb;
        border-radius: 4px;
        flex: 1;
        @include center;
        display: flex;

        .icon-wrapper {
          flex: 0 0 px2rem(28);
          font-size: px2rem(12);
          @include center;
        }

        .search-input {
          flex: 1;
          width: 100%;
          height: px2rem(32);
          font-size: px2rem(14);
          background-color: transparent;
          border: none;
          outline: none;
        }
      }

      .search-cancel {
        font-size: px2rem(14);
        flex: 0 0 px2rem(45);
        color: #346cb9;
        text-align: right;
      }
    }

    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #b8b9bb;

      .slide-contents-book-img-wrapper {
        flex: 0 0 px2rem(45);

        .slide-contents-book-img {
          width: px2rem(45);
          height: px2rem(60);
        }
      }

      .slide-contents-book-info-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;

        .slide-contents-book-title {
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include left;
          .slide-contents-book-title-text {
            @include ellipsis2(2, break-all);
          }
        }

        .slide-contents-book-author {
          font-size: px2rem(12);
          @include left;
          margin-top: px2rem(7);
          .slide-contents-book-author {
            line-height: px2rem(18);
            @include ellipsis2(1, break-all);
          }
        }
      }

      .slide-contents-book-progress-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: px2rem(12);

        .slide-contents-book-time {
          width: px2rem(80);
          margin-top: px2rem(8);
        }
      }
    }

    .slide-contents-list {
      .slide-content-list-item {
        display: flex;
        margin: 0 px2rem(15);
        padding: px2rem(15) 0;
        box-sizing: border-box;
        font-size: px2rem(14);
        border-bottom: px2rem(1) solid #b8b9bb;

        &.selected {
          color: #346cb9;
        }

        .list-item-title {
          flex: 1;
          line-height: px2rem(18);
          @include ellipsis;
          margin-right: 10px;
        }

        .list-item-page {
          @include right;
          flex: 0 0 px2rem(30);
          font-size: px2rem(10);
        }
      }
    }

    .slide-search-list {
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-search-item {
        font-size: px2rem(14);
        line-height: 1.3;
        padding: px2rem(15) 0;
        border-bottom: px2rem(1) solid #b8b9bb;
        @include ellipsis2(3, keep-all);
      }
    }
  }
</style>

<style>
  /*scoped中的css无法应用于v-html绑定的内容*/
  /*要为v-html添加css需要写在全局的css中*/
  /*搜索文字高亮*/
  .ebook .ebook-slide-contents .slide-search-list .slide-search-item .text-search-text{
    color: #346cb9;
    font-weight: bold;
  }
</style>
