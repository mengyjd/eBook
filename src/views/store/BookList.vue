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

  export default {
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
      // if (this.$route.query.categoryText) {
      //   this.titleText = getTranslateCategoryText(this.$route.query.categoryText, this)
      // }
      // list().then(res => {
      //   this.list = res.data.data
      //   console.log(this.list)
      //   const categoryText = this.$route.query.categoryText
      //   const keywords = this.$route.query.keywords
      //   if (categoryText) {
      //     const data = this.list[categoryText]
      //     this.list = {}
      //     this.list[categoryText] = data
      //   } else if (keywords) {
      //     Object.keys(this.list).filter(key => {
      //       this.list[key] = this.list[key].filter(book => book.fileName.indexOf(keywords) >= 0)
      //       return this.list[key].length > 0
      //     })
      //   }
      // })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .list-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
  }
</style>
