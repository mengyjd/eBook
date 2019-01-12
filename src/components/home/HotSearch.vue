<template>
  <div class="hot-search">
    <div class="title">
      <span class="label">{{label}}</span>
      <span class="btn">{{btnText}}</span>
    </div>
    <div class="content-wrapper">
      <div class="search-content"
           v-for="(item, index) in searchList"
           :key="index"
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
  export default {
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
        padding: px2rem(10) px2rem(20);
        align-items: center;

        .icon-wrapper {
          margin-right: px2rem(10);
        }

        .search-info {
          flex: 1;

          .search-text {
            flex: 1;
            font-size: px2rem(14);
            line-height: px2rem(16);
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
