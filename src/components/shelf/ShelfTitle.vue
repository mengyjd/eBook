<template>
  <transition name="fade">
    <div class="shelf-title" ref="test" v-show="shelfTitleVisible"
         :class="{'show-shadow': ifShowShadow}">
      <!--中间的'标题'-->
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{ title }}</span>
        <span class="shelf-sub-title-text"
              v-show="isEditModel">{{selectText}}</span>
      </div>
      <!--左侧'个人中心'和'返回'按钮-->
      <div class="shelf-title-btn-wrapper shelf-title-left">
        <span class="shelf-title-btn-text icon-person2"
              :class="isLogged ? 'login' : 'login-out'"
              v-show="userInfoVisible"
              @click="showUserInfo"></span>
        <span class="icon-back shelf-title-btn-text"
              v-show="backBtnVisible"
              @click="back"></span>
      </div>
      <!--右侧'编辑'和'取消'按钮-->
      <div class="shelf-title-btn-wrapper shelf-title-right"
           v-show="editBtnVisible"
           @click="onClickEdit">
        <span class="shelf-title-btn-text">{{ rightText }}</span>
      </div>
      <!--'修改分组'按钮,分组中无图书时在右侧,有图书时在左侧-->
      <div class="shelf-title-btn-wrapper"
           :class="isEmptyShelfGroup ? 'shelf-title-right' : 'shelf-title-left'"
           v-show="changeGroupBtnVisible"
           @click="onChangeGroup">
        <span class="change-group-text">{{ $t('shelf.editGroup') }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import { saveBookShelf } from '../../utils/localStorage'
  import { gotoUserInfo } from '../../utils/routerSkip'

  export default {
    mixins: [storeShelfMixin],
    props: {
      offsetY: Number,
      leftText: String,
      title: String
    },
    data () {
      return {
        ifShowShadow: false,
        popup: null
      }
    },
    watch: {
      offsetY (offsetY) {
        this.ifShowShadow = offsetY !== 0
      }
    },
    computed: {
      isLogged () {
        return this.$store.state.isLogged
      },
      selectText () {
        const selectedNum = this.shelfSelected.length
        if (selectedNum === 0) {
          return this.$t('shelf.selectBook')
        } else if (selectedNum === 1) {
          return this.$t('shelf.haveSelectedBook').replace('$1', selectedNum)
        } else {
          return this.$t('shelf.haveSelectedBooks').replace('$1', selectedNum)
        }
      },
      rightText () {
        return this.isEditModel ? this.$t('shelf.cancel') : this.$t('shelf.edit')
      },
      isEmptyShelfGroup () {
        return !this.shelfGroup || !this.shelfGroup.itemList || this.shelfGroup.itemList.length === 0
      },
      backBtnVisible () {
        return !this.isEditModel && this.currentType === 2
      },
      userInfoVisible () {
        return this.currentType === 1
      },
      editBtnVisible () {
        return this.currentType === 1 || !this.isEmptyShelfGroup
      },
      changeGroupBtnVisible () {
        return this.currentType === 2 && (this.isEditModel || this.isEmptyShelfGroup)
      }
    },
    methods: {
      showUserInfo () {
        gotoUserInfo(this, this.$store.state.username)
      },
      onClickEdit () {
        // 每当点击编辑或取消时都将选中的图书清空
        this.clearSelectedBooks()
        this.setIsEditModel(!this.isEditModel)
      },
      // 点击修改分组
      onChangeGroup () {
        this.popup = this.createPopup({
          btns: [
            {
              text: this.$t('shelf.editGroupName'),
              click: this.changeGroupName
            },
            {
              text: this.$t('shelf.showDeleteGroup'),
              click: this.showDeleteGroup,
              type: 'danger'
            },
            {
              text: this.$t('shelf.cancel'),
              click: this.hidePopup
            }
          ]
        }).show()
      },
      changeGroupName () {
        this.dialog = this.createShelfDialog({
          showNewGroup: true,
          dialogTitle: this.$t('shelf.editGroupName')
        }).show()
        this.dialog.changeInputContent(this.shelfGroup.title)
        this.hidePopup()
      },
      // 点击删除分组
      showDeleteGroup () {
        // 先隐藏原来的popup
        this.hidePopup()
        // 隐藏popup动画完成之后再创建一个确认删除分组操作的popup
        setTimeout(() => {
          this.popup = this.createPopup({
            title: this.$t('shelf.deleteGroupTitle'),
            btns: [
              {
                text: this.$t('shelf.confirm'),
                type: 'danger',
                click: this.deleteGroup
              },
              {
                text: this.$t('shelf.cancel'),
                click: this.hidePopup
              }
            ]
          }).show()
        }, 300)
      },
      // 用户确认删除分组操作
      deleteGroup() {
        if (!this.isEmptyShelfGroup) {
          // 如果分组内有图书
          // 将分组内的图书全部改为选中状态再移动到书架中
          this.setShelfSelected(this.shelfGroup.itemList.map(book => {
            book.selected = true
            return book
          })).then(() => {
            this.moveOutGroup(() => {
              this.addBooksToShelfList(this.shelfSelected, this.shelfList).then(() => {
                this.deleteGroupBooksComplete()
              })
              // this.addBooksToShelfList(this.shelfSelected, this.shelfList, () => {
              //   this.deleteGroupBooksComplete()
              // })
            })
          })
        } else {
          this.deleteGroupBooksComplete()
        }
      },
      deleteGroupBooksComplete() {
        // 将此分组从书架中删除
        this.setShelfList(this.shelfList.filter(
          book => book.id !== this.shelfGroup.id))
          .then(() => {
            this.clearSelectedBooks()
            saveBookShelf(this.shelfList)
            this.back()
          })
      },
      hidePopup() {
        this.popup.hide()
      },
      back () {
        this.$router.go(-1)
        this.initShelfState()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .login {
    color: #31a9ff !important;
  }
  .login-out {
    color: #999999 !important;
  }

  .shelf-title {
    position: relative;
    font-size: px2rem(16);
    width: 100%;
    height: px2rem(42);
    background-color: #fff;
    z-index: 150;
    top: px2rem(-1);

    &.show-shadow {
      @include minBoxShadow;
    }

    .shelf-title-text-wrapper {
      color: #333;
      position: absolute;
      width: 100%;
      height: px2rem(42);
      @include columnCenter;

      .shelf-title-text {
        font-size: px2rem(16);
        font-weight: bold;
      }

      .shelf-sub-title-text {
        font-size: px2rem(12);
        margin-top: 3px;
      }
    }

    .shelf-title-btn-wrapper {
      position: absolute;
      box-sizing: border-box;
      top: 0;
      height: 100%;
      font-size: px2rem(14);
      @include center;

      .shelf-title-btn-text {
        color: #666;
      }

      &.shelf-title-left {
        left: 0;
        padding-left: px2rem(15);
      }

      &.shelf-title-right {
        right: 0;
        padding-right: px2rem(15);
      }
    }
  }
</style>
