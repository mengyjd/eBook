<template>
  <div class="list-wrapper">
    <detail-title :text="getTitleText()"></detail-title>
    <scroll :top="45"
            :bottom="0"
    >
      <featured :title-text="titleText ? titleText : getCategoryText(key)"
                v-for="(value, key, index) in list" :key="index"
                :data="value"
      ></featured>
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
        titleText: ''
      }
    },
    computed: {
      totalNum () {
        if (!this.list) {
          return 0
        }
        let num = 0
        Object.keys(this.list).forEach(key => {
          num += this.list[key].length
        })
        return num
      }
    },
    created () {
      this.titleText = getTranslateCategoryText(this.$route.query.categoryText, this)
      list().then(res => {
        this.list = res.data.data
        const categoryText = this.$route.query.categoryText
        const keywords = this.$route.query.keywords
        if (categoryText) {
          const data = this.list[categoryText]
          this.list = {}
          this.list[categoryText] = data
        } else if (keywords) {
          Object.keys(this.list).filter(key => {
            this.list[key] = this.list[key].filter(book => book.fileName.indexOf(keywords) >= 0)
            return this.list[key].length > 0
          })
        }
      })
    },
    methods: {
      getCategoryText (key) {
        return `${getTranslateCategoryText(key, this)}(${this.list[key].length})`
      },
      getTitleText () {
        return this.$t('home.allBook').replace('$1', this.totalNum)
      }
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
