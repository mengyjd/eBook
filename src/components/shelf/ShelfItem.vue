<template>
  <div class="shelf-item point shelf-item-shadow"
       @click="onItemClick">
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
import { storeHomeMixin, storeShelfMixin } from '@/utils/mixin'
import { gotoEbookRead, gotoStoreHome } from '@/utils/routerSkip'

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
    temp() {
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
    onItemClick() {
      // 处于编辑模式时,点击封面
      if (this.isEditModel) {
        this.changeBookSelectState()
      } else {
        // 非编辑模式, 直接点击书籍时
        if (this.book.type === 1) {
          // item是书籍时, 直接进入阅读界面
          gotoEbookRead(this.book, this)
        } else if (this.book.type === 2) {
          // item是文件夹时
          this.$router.push({
            path: '/store/group',
            query: {
              title: this.book.title
            }
          })
        } else if (this.book.type === 3) {
          // item是添加按钮时, 跳转到书城首页
          gotoStoreHome(this)
        }
      }
    },
    changeBookSelectState() {
      // 如果点击的是分组或者添加书籍按钮, 则直接返回
      if (this.book.type !== 1) {
          return
      }
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
  background: #fff;

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
