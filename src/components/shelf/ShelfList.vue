<template>
  <div class="shelf-list">
    <transition-group
      name="list"
      tag="div"
      id="shelf-list">
      <div v-for="item in data" :key="item.id"
           class="shelf-list-item-wrapper">
        <shelf-item :book="item" :style="{ height: shelfHeight }"></shelf-item>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import ShelfItem from './ShelfItem'

  export default {
    mixins: [storeShelfMixin],
    props: {
      data: Array
    },
    computed: {
      shelfHeight () {
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
    padding: 0 px2rem(10);
    box-sizing: border-box;

    #shelf-list {
      display: flex;
      flex-wrap: wrap;

      .shelf-list-item-wrapper {
        width: 33.33%;
        font-size: px2rem(13);
        font-weight: bold;
        line-height: px2rem(16);
        margin-bottom: px2rem(25);
        padding: px2rem(15);
        box-sizing: border-box;
        transition: all .5s;
        &.list-leave-active {
          display: none;
        }
      }
    }
  }
</style>
