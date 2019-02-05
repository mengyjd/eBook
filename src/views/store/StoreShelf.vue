<template>
  <div class="shelf-wrapper">
    <shelf-title
      :offsetY="offsetY"
      :title="$t('shelf.title')"
      :left-text="$t('shelf.clearCache')"/>
    <scroll
      :top="0"
      :bottom="scrollBottom"
      class="shelf-scroll-wrapper"
      @onScroll="onScroll"
      ref="scroll">
      <shelf-search
        :offsetY="offsetY"
        @onClickCancel="onClickCancel"/>
      <shelf-list class="shelf-list"/>
    </scroll>
    <shelf-footer/>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import ShelfSearch from '../../components/shelf/ShelfSearch'
  import ShelfList from '../../components/shelf/ShelfList'
  import ShelfFooter from '../../components/shelf/ShelfFooter'
  import Scroll from '../../components/common/Scroll'
  import { storeShelfMixin } from '../../utils/mixin'
  import { shelf } from '../../api/store'
  import { addShelfList } from '../../utils/store'

  export default {
    mixins: [storeShelfMixin],
    components: {
      Scroll,
      ShelfTitle,
      ShelfSearch,
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
      isEditModel(isEdit) {
        this.scrollBottom = isEdit ? 48 : 0
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
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
      shelf().then(res => {
        this.setShelfList(addShelfList(res.data.bookList))
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
