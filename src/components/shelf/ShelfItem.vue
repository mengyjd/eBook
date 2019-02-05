<template>
  <div class="shelf-item"
       :class="{'shelf-item-shadow': book.type !== 3}"
       @click="onItemClick"
  >
    <component :is="temp"
               :data="book"
               :class="{opacity: book.type === 2 && isEditModel}"
    ></component>
    <div class="icon-selected"
         :class="{'is-selected': book.selected}"
         v-show="isEditModel"
         v-if="book.type === 1"
    ></div>
  </div>
</template>

<script>
  import Book from './ShelfItemBook'
  import Category from './ShelfItemCategory'
  import Add from './ShelfItemAdd'
  import { storeHomeMixin, storeShelfMixin } from '../../utils/mixin'
  import { gotoStoreHome } from '../../utils/store'

  export default {
    mixins: [storeHomeMixin, storeShelfMixin],
    components: {
      Book,
      Category,
      Add
    },
    props: {
      book: Object
    },
    computed: {
      temp () {
        if (this.book.type === 1) {
          return Book
        } else if (this.book.type === 2) {
          return Category
        } else {
          return Add
        }
      }
    },
    methods: {
      onItemClick () {
        // 处于编辑模式时,点击封面
        if (this.isEditModel) {
          this.changeBookSelectState()
          this.changeShelfTabState()
        } else {
          // 非编辑模式, 直接点击书籍时
          if (this.book.type === 1) {
            // item是书籍时, 直接跳转到详情页
            this.showDetail(this.book)
          } else if (this.book.type === 2) {
            // item是文件夹时
            this.$router.push({
              path: '/store/folder'
            })
          } else if (this.book.type === 3) {
            // // item是添加按钮时, 跳转到书城首页
            gotoStoreHome(this)
          }
        }
      },
      changeBookSelectState() {
        // 改变图书的选中状态
        // 并更改shelfSelected数组
        this.book.selected = !this.book.selected
        if (this.book.selected) {
          this.shelfSelected.pushWithoutDuplicate(this.book)
        } else {
          this.setShelfSelected(this.shelfSelected.filter(
            book => book.id !== this.book.id
          ))
        }
      },
      // 判断选中的书籍
      // 是否开启私密阅读 以及 是否开启缓存
      changeShelfTabState() {
        this.setIsOpenPrivate(false) // 默认为false
        this.setIsOpenCache(false) // 默认为false
        // 如果处于编辑模式并且选中的书籍为0
        // 则显示开启私密阅读图标
        if (this.shelfSelected.length === 0) {
          this.setIsOpenPrivate(true)
          this.setIsOpenCache(true)
        }
        // 遍历选中的书籍
        this.shelfSelected.forEach(book => {
          // 如果有一本书不是私密阅读,则显示开启私密阅读状态
          if (!book.private) {
            this.setIsOpenPrivate(true)
          }
          // 如果有一本书不没有缓存,则显示开启缓存状态
          if (!book.cache) {
            this.setIsOpenCache(true)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .shelf-item {
    position: relative;
    width: 100%;
    height: 100%;

    .icon-selected {
      position: absolute;
      font-size: px2rem(18);
      color: rgba(0, 0, 0, .3);
      bottom: px2rem(5);
      right: px2rem(6);

      &.is-selected {
        color: #409eff;
      }
    }
  }

  .shelf-item-shadow {
    box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, .3);
  }

  .opacity {
    opacity: .7;
  }
</style>
