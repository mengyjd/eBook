<template>
  <div class="shelf-list">
    <div v-for="(item, index) in shelfList" :key="index.id"
         class="shelf"
    >
      <shelf-item :book="item" :style="{ height: shelfHeight }"></shelf-item>
    </div>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import ShelfItem from './ShelfItem'

  export default {
    mixins: [storeShelfMixin],
    computed: {
      shelfHeight() {
        return ((window.innerWidth - 110) / 3) / (250 / 350) + 'px'
      }
    },
    components: {
      ShelfItem
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .shelf-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: px2rem(20) px2rem(10);
    box-sizing: border-box;
    justify-content: space-between;
    .shelf {
      width: 33.33%;
      font-size: px2rem(13);
      font-weight: bold;
      line-height: px2rem(16);
      margin-bottom: px2rem(25);
      padding: px2rem(15);
      box-sizing: border-box;
    }
  }
</style>
