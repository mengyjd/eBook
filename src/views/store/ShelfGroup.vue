<template>
  <div class="shelf-wrapper">
    <shelf-title
      :offsetY="offsetY"
      :title="shelfGroup ? shelfGroup.title : ''"
      :left-text="$t('shelf.clearCache')"/>
    <scroll
      :top="0"
      :bottom="scrollBottom"
      class="shelf-scroll-wrapper"
      @onScroll="onScroll"
      ref="scroll"
      v-if="shelfGroup && shelfGroup.itemList.length > 0">
      <shelf-list class="shelf-list" :data="shelfGroup.itemList" v-if="shelfGroup"/>
    </scroll>
    <div class="group-none-wrapper" v-else>
      <span class="group-none-text">{{$t('shelf.groupNone')}}</span>
    </div>
    <shelf-footer/>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import ShelfList from '../../components/shelf/ShelfList'
  import ShelfFooter from '../../components/shelf/ShelfFooter'
  import Scroll from '../../components/common/Scroll'
  import { storeShelfMixin } from '../../utils/mixin'

  export default {
    mixins: [storeShelfMixin],
    components: {
      Scroll,
      ShelfTitle,
      ShelfList,
      ShelfFooter
    },
    data () {
      return {
        offsetY: 0,
        scrollBottom: 0
      }
    },
    watch: {
      isEditModel (isEdit) {
        this.scrollBottom = isEdit ? 48 : 0
        if (this.shelfGroup && this.shelfGroup.itemList.length > 0) {
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        }
      }
    },
    methods: {
      onClickCancel () {
        this.$refs.scroll.scrollTo(0, 0)
      },
      onScroll (offsetY) {
        this.offsetY = offsetY
      }
    },
    mounted () {
      this.setCurrentType(2)
      this.getShelfGroupList(this.$route.query.title)
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
        top: px2rem(42);
        left: 0;
        z-index: 150;
      }
    }
    .group-none-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      font-size: px2rem(16);
    }
  }
</style>
