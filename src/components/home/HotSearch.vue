<template>
  <div class="hot-search">
    <div class="title">
      <span class="label">{{label}}</span>
      <span class="btn" @click="onClickBtn">{{btnText}}</span>
    </div>
    <div class="content-wrapper">
      <div class="search-content"
           v-for="(item, index) in searchList"
           :key="index"
           @click="clickSearchItem(item)"
      >
        <div class="icon-wrapper">
          <span :class="getClass(item.type)"
                class="icon"
          ></span>
        </div>
        <div class="search-info">
          <div class="search-text">{{item.text}}</div>
          <div class="search-peopleNum"
               v-if="item.searchPeopleNum"
          >{{getSearchPeopleNum(item.searchPeopleNum)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { gotoDetail } from '../../utils/store'
  import { storeHomeMixin } from '../../utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    props: {
      label: {
        type: String
      },
      btnText: {
        type: String
      },
      searchList: {
        type: Array
      }
    },
    methods: {
      getClass (type) {
        if (type === 'text') {
          return 'icon-search'
        } else {
          return 'icon-book'
        }
      },
      getSearchPeopleNum (num) {
        return this.$t('home.searchPeoples').replace('$1', (num / 10000).toFixed(1))
      },
      onClickBtn () {
        this.$emit('onClickBtn')
      },
      clickSearchItem (item) {
        if (item.type === 'book') {
          // 如果点击的搜索类型为书籍，直接跳转到书籍详情页
          gotoDetail(item, this)
        } else {
          // 如果点击的类型是文字，则直接用该文字进行搜索
          this.searchBook(item.text)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .hot-search {
    padding-top: px2rem(10);
    box-sizing: border-box;
    font-size: px2rem(14);

    .title {
      padding: 0 px2rem(10);
      display: flex;
      justify-content: space-between;

      .btn {
        color: #409eff;
      }
    }

    .content-wrapper {
      width: 100%;

      .search-content {
        width: 100%;
        height: px2rem(35);
        display: flex;
        padding: 0 px2rem(15);
        align-items: center;
        box-sizing: border-box;
        margin: px2rem(15) 0;

        .icon-wrapper {
          margin-right: px2rem(10);
        }

        .search-info {
          flex: 1;

          .search-text {
            flex: 1;
            font-size: px2rem(14);
            line-height: px2rem(18);
            @include ellipsis2(1, boreak-all);
          }

          .search-peopleNum {
            flex: 1;
            font-size: px2rem(12);
            line-height: px2rem(14);
            margin-top: 5px;
          }
        }
      }
    }
  }
</style>
