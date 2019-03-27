<template>
  <div class="list-wrapper">
    <detail-title :text="getTitleText()"></detail-title>
    <scroll :top="45"
            :bottom="0"
    >
      <featured :data="list"
                v-if="!isShowCategoryTitle"></featured>
      <featured :title-text="titleText ? titleText : getCategoryText(key)"
                v-for="(value, key, index) in list" :key="index"
                :data="value"
                v-if="isShowCategoryTitle"></featured>
    </scroll>
  </div>
</template>

<script>
  import { list } from '../../api/store'
  import Featured from '../../components/home/Featured'
  import DetailTitle from '../../components/detail/DetailTitle'
  import Scroll from '../../components/common/Scroll'
  import { getTranslateCategoryText } from '../../utils/store'
  import { storeShelfMixin } from '../../utils/mixin'

  export default {
    mixins: [storeShelfMixin],
    components: {
      Scroll,
      Featured,
      DetailTitle
    },
    data () {
      return {
        list: null,
        titleText: '',
        isShowCategoryTitle: false // 是否显示书籍所属分类的标题
      }
    },
    computed: {
      totalNum () {
        if (!this.list) {
          return 0
        }
        let num = 0
        switch (this.$route.query.type) {
          case 'categoryRecommend':
          case 'keywords':
          case 'categoryBooks':
          case 'searchShelf':
            num = this.list.length
            break
          case 'allCategoryBooks':
            Object.keys(this.list).forEach(key => {
              num += this.list[key].length
            })
            break
        }
        return num
      }
    },
    methods: {
      getCategoryText (key) {
        return `${getTranslateCategoryText(key, this)}(${this.list[key].length})`
      },
      getTitleText () {
        return this.$t('home.allBook').replace('$1', this.totalNum)
      },
      getListData() {
        // 如果是搜索书架中的图书，则使用vuex中的数据
        if (this.$route.query.type === 'searchShelf') {
          this.isShowCategoryTitle = false
          this.list = this.searchShelfList
          return
        }
        list({
          type: this.$route.query.type,
          value: this.$route.query.value
        }).then(res => {
          if (res.status === 200 && res.statusText === 'OK') {
            switch (this.$route.query.type) {
              case 'categoryRecommend':
              case 'keywords':
              case 'categoryBooks':
                this.isShowCategoryTitle = false
                this.list = res.data.books
                break
              case 'allCategoryBooks':
                this.isShowCategoryTitle = true
                this.list = {}
                res.data.books.forEach(book => {
                  this.list[book.categoryText] = []
                })
                res.data.books.forEach(book => {
                  this.list[book.categoryText].push(book)
                })
                break
            }
          } else {
            this.createSampleToast(res.msg)
          }
        })
      }
    },
    created () {
      this.getListData()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .list-wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
