<template>
  <div class="shelf-footer" v-show="isEditModel">
    <div class="shelf-footer-tabs-wrapper">
      <div
        class="shelf-footer-tab"
        :class="{'is-selected': isSelected}"
        v-for="tab in tabs"
        :key="tab.index"
        @click="onClickTab(tab.index)">
        <span
          class="tab-icon"
          :class="getClass(tab)"></span>
        <span class="tab-text">{{getLabel(tab)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import { saveBookShelf } from '../../utils/localStorage'
  import { setLocalForage } from '../../utils/localforage'

  export default {
    mixins: [storeShelfMixin],
    computed: {
      tabs () {
        return [
          {
            index: 1,
            label: this.$t('shelf.private'),
            label2: this.$t('shelf.noPrivate'),
            icon: 'icon-private',
            icon2: 'icon-private-see'
          }, {
            index: 2,
            label: this.$t('shelf.download'),
            label2: this.$t('shelf.delete'),
            icon: 'icon-download',
            icon2: 'icon-download-remove'
          }, {
            index: 3,
            label: this.$t('shelf.move'),
            icon: 'icon-move'
          }, {
            index: 4,
            label: this.$t('shelf.remove'),
            icon: 'icon-shelf'
          }
        ]
      },
      isSelected () {
        return this.shelfSelected.length > 0
      },
      isPrivate () {
        if (this.shelfSelected.length === 0) {
          return true
        } else {
          return !this.shelfSelected.every(book => book.private)
        }
      },
      isCache () {
        if (this.shelfSelected.length === 0) {
          return true
        } else {
          return !this.shelfSelected.every(book => book.cache)
        }
      }
    },
    data () {
      return {
        popupMenu: null
      }
    },
    methods: {
      createClassAndLabel (tab, prop, prop2) {
        if (tab.index === 1) {
          return this.isPrivate ? tab[prop] : tab[prop2]
        } else if (tab.index === 2) {
          return this.isCache ? tab[prop] : tab[prop2]
        } else {
          return tab[prop]
        }
      },
      getClass (tab) {
        return this.createClassAndLabel(tab, 'icon', 'icon2')
      },
      getLabel (tab) {
        return this.createClassAndLabel(tab, 'label', 'label2')
      },
      showPrivate () {
        this.popupMenu = this.createPopup({
          title: this.isPrivate
            ? this.$t('shelf.setPrivateTitle')
            : this.$t('shelf.closePrivateTitle'),
          btns: [
            {
              text: this.isPrivate
                ? this.$t('shelf.open')
                : this.$t('shelf.close'),
              click: this.isPrivate
                ? this.openPrivate
                : this.closePrivate
            }, {
              text: this.$t('shelf.cancel'),
              click: this.hidePopup
            }
          ]
        }).show()
      },
      showCache () {
        this.popupMenu = this.createPopup({
          title: this.isCache
            ? this.$t('shelf.setDownloadTitle')
            : this.$t('shelf.removeDownloadTitle'),
          btns: [
            {
              text: this.isCache
                ? this.$t('shelf.open')
                : this.$t('shelf.delete'),
              click: this.isCache
                ? this.openCache
                : this.deleteCache
            }, {
              text: this.$t('shelf.cancel'),
              click: this.hidePopup
            }
          ]
        }).show()
      },
      showRemoveShelfBook () {
        this.popupMenu = this.createPopup({
          title: this.shelfSelected.length === 1
            ? this.$t('shelf.removeBookTitle').replace('$1', `《${this.shelfSelected[0].title}》`)
            : this.$t('shelf.removeBookTitle').replace('$1', this.$t('shelf.selectedBooks')),
          btns: [
            {
              text: this.$t('shelf.removeBook'),
              type: 'danger',
              click: this.removeSelectedBook
            }, {
              text: this.$t('shelf.cancel'),
              click: this.hidePopup
            }
          ]
        }).show()
      },
      openPrivate () {
        this.createSampleToast(this.$t('shelf.setPrivateSuccess')).show()
        this.shelfSelected.forEach(book => {
          book.private = true
        })
        this.onComplete()
      },
      closePrivate () {
        this.createSampleToast(this.$t('shelf.closePrivateSuccess')).show()
        this.shelfSelected.forEach(book => {
          book.private = false
        })
        this.onComplete()
      },
      openCache () {
        this.createSampleToast(this.$t('shelf.setDownloadSuccess')).show()
        this.downloadSelectedBook()
        this.shelfSelected.forEach(book => {
          book.cache = true
        })
        this.onComplete()
      },
      deleteCache () {
        this.createSampleToast(this.$t('shelf.removeDownloadSuccess')).show()
        this.shelfSelected.forEach(book => {
          book.cache = false
        })
        this.onComplete()
      },
      removeSelectedBook () {
        this.shelfSelected.forEach(selectedBook => {
          this.setShelfList(this.shelfList.filter(book => book !== selectedBook))
        })
        this.onComplete()
        this.setShelfSelected([])
      },
      // 隐藏popup
      hidePopup () {
        this.popupMenu.hide()
      },
      onComplete () {
        this.popupMenu.hide() // 隐藏popup
        this.setIsEditModel(false) // 退出编辑状态
        saveBookShelf(this.shelfList) // 将书架中的书籍数组保存到本地
      },
      onClickTab (index) {
        // 如果点击tab时没有选中书籍, 则什么也不做
        if (this.shelfSelected.length === 0) {
          setLocalForage('name12',
            'tom12',
            value => {
              console.log(value)
            })
          return
        }
        switch (index) {
          case 1:
            this.showPrivate()
            break
          case 2:
            this.showCache()
            break
          case 3:
            break
          case 4:
            this.showRemoveShelfBook()
            break
          default:
            break
        }
      },
      downloadSelectedBook () {
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .shelf-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: px2rem(48);
    width: 100%;
    box-shadow: px2rem(-2) 0 px2rem(2) rgba(0, 0, 0, .3);
    z-index: 300;

    .shelf-footer-tabs-wrapper {
      width: 100%;
      height: 100%;
      display: flex;

      .shelf-footer-tab {
        width: 25%;
        height: 100%;
        @include columnCenter;
        opacity: .5;

        &.is-selected {
          opacity: 1;
        }

        &:last-child {
          color: #ff73a7;
        }

        .tab-icon {
          font-size: px2rem(14);
        }

        .tab-text {
          margin-top: 5px;
          font-size: px2rem(12);
        }
      }
    }
  }
</style>
