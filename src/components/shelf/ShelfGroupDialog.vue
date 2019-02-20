<template>
  <ebook-dialog ref="dialog" :title="title">
    <div class="dialog-list-wrapper" v-if="!isNewGroup">
      <div
        class="dialog-list-item"
        :class="{'add-group': group.edit ? group.edit === 1 : false}"
        v-for="group in groupList" :key="group.title"
        @click="onGroupClick(group)"
        v-if="(group.edit === 2 && currentType === 2) || group.edit !== 2 || !group.edit"
      >
        <div class="item">
          <span class="group-title">{{ group.title }}</span>
          <div class="icon-check" v-if="shelfGroup && shelfGroup.title === group.title && currentType === 2"></div>
        </div>
      </div>
    </div>
    <div class="dialog-new-group-wrapper" v-else>
      <span class="group-name">{{ $t('shelf.groupName') }}</span>
      <div class="dialog-input-wrapper">
        <input
          type="text"
          class="input"
          v-model="inputGroupName"
          ref="input"
          autofocus>
        <div class="clear-input-wrapper"
             v-show="isHaveInput"
             @click="clearInput">
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
    </div>
    <div class="btn-wrapper" slot="btn">
      <span
        class="btn-text"
        @click="onClickCancel">{{ $t('shelf.cancel') }}</span>
      <span
        class="btn-text"
        :class="{opacity: !isHaveInput}"
        @click="createNewGroup"
        v-if="isNewGroup">{{ $t('shelf.confirm') }}</span>
    </div>
  </ebook-dialog>
</template>

<script>
  import EbookDialog from '../common/Dialog'
  import { storeShelfMixin } from '../../utils/mixin'
  import { saveBookShelf } from '../../utils/localStorage'

  export default {
    name: 'shelfDialog',
    mixins: [storeShelfMixin],
    components: {
      EbookDialog
    },
    data () {
      return {
        isNewGroup: false,
        inputGroupName: ''
      }
    },
    props: {
      dialogTitle: String,
      showNewGroup: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      isHaveInput () {
        return this.inputGroupName.length > 0
      },
      title () {
        if (this.dialogTitle) {
          return this.dialogTitle
        } else {
          return this.isNewGroup ? this.$t('shelf.newGroup') : this.$t('shelf.moveBook')
        }
      },
      defaultCategoryList () {
        return [
          {
            title: this.$t('shelf.newGroup'),
            edit: 1
          }, {
            title: this.$t('shelf.groupOut'),
            edit: 2
          }
        ]
      },
      groupCategoryList () {
        return this.shelfList.filter(book => book.type === 2)
      },
      groupList () {
        return [...this.defaultCategoryList, ...this.groupCategoryList]
      }
    },
    watch: {
      isNewGroup(boolean) {
        if (boolean) {
          // 每次进入新建分组界面时为input获取焦点
          this.$nextTick(() => {
            this.$refs.input.focus()
          })
        }
      }
    },
    methods: {
      clearInput () {
        this.inputGroupName = ''
      },
      // 点击分组
      onGroupClick (group) {
        if (group.edit && group.edit === 1) {
          // 点击新建分组
          this.isNewGroup = true
        } else if (group.edit && group.edit === 2) {
          // 点击移出分组
          // 将选中的书籍从当前分组中删除
          this.moveOutGroup(() => {
            // 将选中的书籍添加到书架中
            this.addBooksToShelfList(this.shelfSelected, this.shelfList, () => {
              this.onComplete()
              this.createSampleToast(this.$t('shelf.moveBookOutSuccess')) // 弹出操作成功的提示信息
            })
          })
        } else {
          // 点击分组项
          this.moveToGroup(group)
        }
      },
      moveToGroup (group) {
        this.setShelfList(this.shelfList.filter(book => {
          if (book.itemList) {
            // 移动分组中的图书
            book.itemList = book.itemList.filter(subBook => this.shelfSelected.indexOf(subBook) < 0)
          }
          return this.shelfSelected.indexOf(book) < 0
        }))
          .then(() => {
            if (group && group.itemList) {
              group.itemList = group.itemList.concat(this.shelfSelected)
            }
            this.createSampleToast(this.$t('shelf.moveBookInSuccess')
              .replace('$1', group.title))
            this.onComplete()
          })
      },
      // 创建性分组
      createNewGroup () {
        // 点击确定时,如果input没有输入内容,则什么也不做
        if (!this.inputGroupName) {
          return
        }
        if (this.isDuplicateGroupName()) {
          this.createSampleToast(this.$t('shelf.groupExisted'))
          return
        }
        // 如果showNewGroup=true, 表示要重命名分组
        if (this.showNewGroup) {
          this.shelfGroup.title = this.inputGroupName
          this.onComplete()
          return
        }
        this.isDuplicateGroupName()
        const group = {
          id: this.inputGroupName,
          title: this.inputGroupName,
          type: 2,
          selected: false,
          itemList: []
        }
        let shelfList = this.removeShelfItemAdd(this.shelfList)
        shelfList.push(group)
        this.appendShelfItemAdd(shelfList)
        this.setShelfList(shelfList).then(() => {
          this.moveToGroup(group)
        })
      },
      isDuplicateGroupName () {
        return !this.groupCategoryList.every(
          group => group.title !== this.inputGroupName
        )
      },
      onClickCancel () {
        if (this.isNewGroup) {
          // 如果是新建分组界面
          this.hide()
          // 隐藏dialog后恢复初始状态
          setTimeout(() => {
            this.isNewGroup = false
          }, 300)
        } else {
          // 如果是分组列表页
          this.hide()
        }
        this.inputGroupName = '' // 清空输入框中的文字
      },
      hide () {
        this.$refs.dialog.hide()
        setTimeout(() => {
          this.isNewGroup = false // 退出新建分组模式
        }, 300)
      },
      show () {
        this.isNewGroup = this.showNewGroup
        this.$refs.dialog.show()
      },
      changeInputContent(text) {
        this.inputGroupName = text
      },
      // 操作完成后将组建初始化
      onComplete () {
        this.hide() // 隐藏dialog
        this.setIsEditModel(false) // 退出编辑模式
        this.clearSelectedBooks()
        saveBookShelf(this.shelfList) // 将书架中的图书保存到本地
        this.inputGroupName = '' // 清空输入框中的文字
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .dialog-list-wrapper {
    box-sizing: border-box;
    font-size: px2rem(14);
    max-height: px2rem(320);
    @include scroll;

    .dialog-list-item {
      display: flex;
      flex-direction: column;
      padding: px2rem(15);
      box-sizing: border-box;

      &.add-group {
        color: #4aabff
      }

      .item {
        display: flex;
        justify-content: space-between;

        .icon-check {
          color: #409eff;
        }
      }
    }
  }

  .dialog-new-group-wrapper {
    padding: px2rem(15);

    .group-name {
      font-size: px2rem(12);
    }

    .dialog-input-wrapper {
      position: relative;
      @include center;
      padding: px2rem(15) 0;
      box-sizing: border-box;

      .input {
        width: 100%;
        outline: none;
        border: none;
        border-bottom: 1px solid #d2d2d2;
        padding-bottom: px2rem(5);
        font-size: px2rem(14);
      }

      .clear-input-wrapper {
        position: absolute;
        right: px2rem(10);
        bottom: px2rem(20);
        @include center;

        .icon-close-circle-fill {
          font-size: px2rem(15);
          color: #ccc;
        }
      }
    }
  }

  .btn-wrapper {
    width: 100%;
    font-size: px2rem(16);
    background: #4aabff;
    display: flex;
    color: #fff;
    font-weight: bold;
    border-radius: 0 0 10px 10px;

    .btn-text {
      flex-grow: 1;
      @include center;

      &.opacity {
        opacity: .7;
      }
    }
  }
</style>
