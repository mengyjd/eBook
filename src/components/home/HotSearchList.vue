<template>
  <div class="hot-search-list-wrapper">
    <scroll :top="62"
            ref="scroll"
            @onScroll="onScroll"
    >
      <hot-search :label="$t('home.hotSearch')"
                  :btnText="$t('home.change')"
                  :searchList="hotSearchList"
      ></hot-search>
      <div class="line"></div>
      <hot-search :label="$t('home.historySearch')"
                  :btnText="$t('home.clear')"
                  :searchList="searchHistory"
      ></hot-search>
    </scroll>
  </div>
</template>

<script>
  import HotSearch from './HotSearch'
  import Scroll from '../common/Scroll'
  import { storeHomeMixin } from '../../utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    data () {
      return {
        hotSearchList: [
          { text: '热搜一', searchPeopleNum: '13111', type: 'book' },
          { text: '热搜一', searchPeopleNum: '13111', type: 'book' },
          { text: '热搜一', searchPeopleNum: '501586', type: 'book' },
          { text: '热搜一', searchPeopleNum: '2123', type: 'book' },
          { text: '热搜一', searchPeopleNum: '13000', type: 'book' }
        ],
        searchHistory: [
          { type: 'text', text: '搜索内容' },
          { type: 'text', text: '搜索内容' },
          { type: 'text', text: '搜索内容' },
          { type: 'text', text: '搜索内容' },
          { type: 'text', text: '搜索内容' },
          { type: 'book', text: '这是一本书' },
          { type: 'text', text: '搜索内容' },
          { type: 'text', text: '搜索内容' },
          { type: 'book', text: '这是一本书' },
          { type: 'text', text: '搜索内容' },
          { type: 'text', text: '搜索内容' }
        ]
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
      }
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
