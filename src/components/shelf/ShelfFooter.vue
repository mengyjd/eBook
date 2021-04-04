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
  import { download } from '../../api/store'

  export default {
    mixins: [storeShelfMixin],
    computed: {
      tabs () {
        return [
          {
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
      // 显示是否开启私密阅读Popup
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
      // 显示是否开启缓存阅读Popup
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
                : () => {
                  this.deleteCache(this.shelfSelected)
                  this.onComplete()
                }
            }, {
              text: this.$t('shelf.cancel'),
              click: this.hidePopup
            }
          ]
        }).show()
      },
      // 显示是移动分组Dialog
      showShelfDialog () {
        this.createShelfDialog().show()
      },
      // 显示是否移出书架Popup
      showRemoveShelfBook () {
        this.popupMenu = this.createPopup({
          title: this.shelfSelected.length === 1
            ? this.$t('shelf.removeBookTitle').replace('$1', `《${this.shelfSelected[0].title}》`)
            : this.$t('shelf.removeBookTitle').replace('$1', this.$t('shelf.selectedBooks')),
          btns: [
            {
              text: this.$t('shelf.removeBook'),
              type: 'danger',
              click: this.confirmDelete
            }, {
              text: this.$t('shelf.cancel'),
              click: this.hidePopup
            }
          ]
        }).show()
      },
      // 开启私密阅读
      openPrivate () {
        this.createSampleToast(this.$t('shelf.setPrivateSuccess'))
        this.shelfSelected.forEach(book => {
          book.private = true
        })
        this.onComplete()
      },
      // 关闭私密阅读
      closePrivate () {
        this.createSampleToast(this.$t('shelf.closePrivateSuccess'))
        this.shelfSelected.forEach(book => {
          book.private = false
        })
        this.onComplete()
      },
      // 开启缓存
      async openCache () {
        // 点击开启离线时将popup隐藏
        await this.downloadSelectedBook()
        this.createSampleToast(this.$t('shelf.setDownloadSuccess'))
        this.onComplete()
      },
      // 点击确认移出书架按钮
      confirmDelete() {
        this.removeSelectedBook(this.shelfSelected)
        this.setShelfSelected([])
        this.onComplete()
      },
      hidePopup () {
        this.popupMenu.hide()
      },
      onComplete () {
        this.hidePopup() // 隐藏popup
        this.clearSelectedBooks() // 清空选中的书籍
        this.setIsEditModel(false) // 退出编辑状态
        saveBookShelf(this.shelfList) // 将书架中的书籍数组保存到本地
      },
      // 点击底部tab栏的按钮
      onClickTab (index) {
        // 如果点击tab时没有选中书籍, 则什么也不做
        if (this.shelfSelected.length === 0) {
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
            this.showShelfDialog()
            break
          case 4:
            this.showRemoveShelfBook()
            break
          default:
            break
        }
      },
      // 下载选中的电子书
      async downloadSelectedBook () {
        // 遍历选中的书籍
        for (let i = 0; i < this.shelfSelected.length; i++) {
          if (!this.shelfSelected[i].cache) {
            // 对于没有下载的书籍调用下载书籍方法
            await this.downloadBook(this.shelfSelected[i])
              .then(book => {
                book.cache = true // 下载成功时将cache改为true
                saveBookShelf(this.shelfList) // 更新书籍状态
              }).catch((e) => {
                console.log('下载电子书出错', e)
                // 当下载出错时弹出提示
                this.createSampleToast(this.$t('shelf.setDownloadError'))
              })
          }
        }
      },
      // 下载电子书
      downloadBook (book) {
        // 创建一个toast
        let text = ''
        const toast = this.createSampleToast(text)
        return new Promise((resolve, reject) => {
          download(
            book,
            progressEvent => {
              /**
               * 更新下载进度
               */
              toast.continueShow()
              const progress = Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%'
              let text = this.$t('shelf.progressDownload')
                .replace('$1', `《${book.title}》(${progress})`)
              toast.updateText(text)
            },
            res => {
              toast.remove() // 下载完成移除toast
              resolve(book)
            },
            reject
          )
        })
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
        width: 33%;
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
