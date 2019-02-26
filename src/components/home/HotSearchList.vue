<template>
  <div class="hot-search-list-wrapper">
    <scroll :top="62"
            ref="scroll"
            @onScroll="onScroll">
      <!--热门搜索项-->
      <hot-search :label="$t('home.hotSearch')"
                  :btnText="$t('home.change')"
                  :searchList="hotSearchList"
                  @onClickBtn="changeHotSearch"></hot-search>
      <div class="line"></div>
      <!--搜索历史-->
      <hot-search :label="$t('home.historySearch')"
                  :btnText="$t('home.clear')"
                  :searchList="searchHistory"
                  @onClickBtn="clearHistory"></hot-search>
    </scroll>
  </div>
</template>

<script>
  import HotSearch from './HotSearch'
  import Scroll from '../common/Scroll'
  import { storeHomeMixin } from '../../utils/mixin'
  import { hotSearch } from '../../api/store'
  import { clearSearchHistory, getSearchHistory } from '../../utils/localStorage'

  export default {
    mixins: [storeHomeMixin],
    data () {
      return {
        hotSearchList: [],
        searchHistory: []
      }
    },
    components: {
      HotSearch,
      Scroll
    },
    methods: {
      onScroll (offsetY) {
        this.setHotSearchPageOffsetY(offsetY)
      },
      reset () {
        this.$refs.scroll.scrollTo(0, 0)
      },
      clearHistory () {
        clearSearchHistory()
        this.searchHistory = []
      },
      changeHotSearch () {
        this.getHotSearch()
      },
      getHotSearch () {
        hotSearch().then(res => {
          if (res && res.status === 200) {
            this.hotSearchList = res.data.hotSearchList
          }
        })
      },
      getSearchHistory() {
        const searchHistory = getSearchHistory()
        if (searchHistory) {
          this.searchHistory = searchHistory
        }
      }
    },
    mounted () {
      this.getHotSearch()
      this.getSearchHistory()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .hot-search-list-wrapper {
    width: 100%;

    .line {
      width: 100%;
      height: 2px;
      margin: px2rem(10) 0;
      background-color: #f2f2f2;
    }
  }
</style>
