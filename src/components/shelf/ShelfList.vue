<template>
  <div class="shelf-list">
    <transition-group
      name="list"
      tag="div"
      id="shelf-list">
      <div v-for="item in data" :key="item.id"
           class="shelf-list-item-wrapper responsive-book-box">
        <shelf-item :book="item"></shelf-item>
      </div>
      <div class="shelf-list-item-wrapper responsive-book-box empty"
           v-for="(item, index) in emptyDiv"
           :key="index"></div>
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
    data () {
      return {
        emptyDiv: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    // computed: {
    //   shelfHeight () {
    //     return ((window.innerWidth - 110) / 3) / (250 / 350) + 'px'
    //   }
    // },
    components: {
      ShelfItem
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/responsive";

  .shelf-list {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;

    #shelf-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .shelf-list-item-wrapper {
        padding: 10px 10px 40px 10px;
        transition: all .5s;

        &.list-leave-active {
          display: none;
        }
      }
    }
  }

  .empty {
    height: 0;
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
