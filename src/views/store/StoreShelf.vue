<template>
  <div class="shelf-wrapper">
    <shelf-title :offsetY="offsetY"></shelf-title>
    <scroll :top="0"
            class="shelf-scroll-wrapper"
            @onScroll="onScroll"
            ref="scroll"
    >
      <shelf-search :offsetY="offsetY"
                    @onClickCancel="onClickCancel"
      ></shelf-search>
      <shelf-list class="shelf-list"></shelf-list>
    </scroll>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import ShelfSearch from '../../components/shelf/ShelfSearch'
  import ShelfList from '../../components/shelf/ShelfList'
  import { storeShelfMixin } from '../../utils/mixin'
  import Scroll from '../../components/common/Scroll'
  import { shelf } from '../../api/store'

  export default {
    mixins: [storeShelfMixin],
    components: {
      Scroll,
      ShelfTitle,
      ShelfSearch,
      ShelfList
    },
    data () {
      return {
        offsetY: 0
      }
    },
    methods: {
      onClickCancel() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      onScroll(offsetY) {
        this.offsetY = offsetY
      }
    },
    mounted () {
      shelf().then(res => {
        console.log(res)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .shelf-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 100;
    .shelf-scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 110;
      .shelf-list {
        position: absolute;
        top: px2rem(94);
        left: 0;
        z-index: 150;
      }
    }
  }
</style>
