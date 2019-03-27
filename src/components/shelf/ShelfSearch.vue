<template>
  <div class="shelf-search-wrapper"
       :class="{'search-top': ifInputClicked, 'show-shadow': ifShowShadow && ifInputClicked}">
    <!--<transition name="fade">-->
      <div class="shelf-search">
        <div class="search-wrapper">
          <div class="icon-wrapper">
            <span class="icon-search icon"></span>
          </div>
          <div class="input-wrapper">
            <input type="text" class="input" :placeholder="$t('shelf.search')"
                   @click="onInputClick"
                   v-model="searchText"
                   @keyup.enter.exact="searchShelf"
            >
          </div>
          <div class="clear-search-text-wrapper"
               @click="clearSearchText"
               v-if="searchText">
            <span class="icon-close-circle-fill icon"></span>
          </div>
        </div>
        <div class="icon-local-wrapper"
             v-if="!ifInputClicked"
             @click="switchLang"
        >
          <span class="icon-en icon" v-if="lang === 'en'"></span>
          <span class="icon-cn icon" v-else></span>
        </div>
        <div class="cancel-btn-wrapper" v-if="ifInputClicked">
        <span class="cancel-btn-text"
              @click="onClickCancel"
        >{{$t('shelf.cancel')}}</span>
        </div>
      </div>
    <!--</transition>-->
    <transition name="title-move">
      <!--<div class="shelf-search-tab-wrapper"-->
           <!--v-show="ifInputClicked"-->
      <!--&gt;-->
        <!--<div class="tab-item"-->
             <!--v-for="(tab, index) in tabs" :key="index"-->
             <!--:class="{'selected': tab.selected}"-->
             <!--@click="onClickTab(tab)"-->
        <!--&gt;-->
          <!--<span class="tab-text">{{tab.text}}</span>-->
        <!--</div>-->
      <!--</div>-->
    </transition>
  </div>
</template>

<script>
  import { setLocalStorage } from '../../utils/localStorage'
  import { storeShelfMixin } from '../../utils/mixin'
  import { removeShelfItemAdd } from '../../utils/store'
  import { flattenShelfList } from '../../utils/utils'
  import { gotoList } from '../../utils/routerSkip'

  export default {
    mixins: [storeShelfMixin],
    props: {
      offsetY: Number
    },
    watch: {
      offsetY(offsetY) {
        this.ifShowShadow = offsetY !== 0
      }
    },
    data () {
      return {
        ifInputClicked: false,
        searchText: '',
        ifShowShadow: false
      }
    },
    computed: {
      lang () {
        return this.$i18n.locale
      },
      tabs() {
        return [
          {
            id: 1,
            text: this.$t('shelf.default'),
            selected: true
          },
          {
            id: 2,
            text: this.$t('shelf.progress'),
            selected: false
          },
          {
            id: 3,
            text: this.$t('shelf.purchase'),
            selected: false
          }
        ]
      }
    },
    methods: {
      onClickTab (item) {
        this.tabs.forEach(tab => {
          tab.selected = tab.id === item.id
        })
        this.$forceUpdate()
      },
      clearSearchText () {
        this.searchText = ''
      },
      switchLang () {
        this.$i18n.locale = this.$i18n.locale === 'cn' ? 'en' : 'cn'
        setLocalStorage('locale', this.$i18n.locale)
      },
      onInputClick () {
        this.ifInputClicked = true
        // this.setShelfTitleVisible(false)
      },
      onClickCancel () {
        this.ifInputClicked = false
        this.searchText = '' // 清空输入框
        this.setShelfTitleVisible(true) // 显示标题栏
        this.$emit('onClickCancel')
      },
      moveSearch () {
        this.setShelfTitleVisible(false)
        this.$refs.search.style.top = 0
      },
      // 搜索书架
      searchShelf() {
        const shelfList = flattenShelfList(removeShelfItemAdd(this.shelfList))
        const searchList = shelfList.filter(book => {
          return book.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
        })
        this.setSearchShelfList(searchList)
        gotoList(this, {
          type: 'searchShelf'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .shelf-search-wrapper {
    position: relative;
    width: 100%;
    height: px2rem(94);
    box-sizing: border-box;
    font-size: 15px;
    background-color: #fff;
    z-index: 200;
    &.search-top {
      position: fixed;
      top: 0;
      left: 0;
    }
    &.show-shadow {
      @include minBoxShadow;
    }

    .shelf-search {
      width: 100%;
      height: px2rem(52);
      position: absolute;
      top: px2rem(42);
      padding: 0 px2rem(15);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex: 1;
      transition: all $animationTime;

      &.search-top {
        top: 0;
      }

      .search-wrapper {
        flex: 1;
        display: flex;
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(5);
        align-items: center;
        padding: px2rem(7) px2rem(10);
        box-sizing: border-box;

        .input-wrapper {
          flex: 1;
          margin-left: px2rem(10);

          .input {
            width: 100%;
            border: none;
            outline: none;

            &::-webkit-input-placeholder {
              color: #ccc;
              font-size: 14px;
            }
          }
        }

        .clear-search-text-wrapper {
          padding: 0 px2rem(10);
          box-sizing: border-box;

          .icon-close-circle-fill {
            color: #ccc;
          }
        }
      }

      .icon-local-wrapper {
        margin-left: px2rem(15);

        .icon {
          font-size: px2rem(22);
        }
      }

      .cancel-btn-wrapper {
        padding-left: px2rem(15);
        box-sizing: border-box;

        .cancel-btn-text {
          font-size: 14px;
          color: $color-blue;
        }
      }
    }

    .shelf-search-tab-wrapper {
      width: 100%;
      height: px2rem(42);
      position: absolute;
      top: px2rem(52);
      padding: 0 px2rem(15);
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 12px;
      color: #999;

      .tab-item {
        &.selected {
          color: $color-blue;
        }
      }
    }
  }
</style>
