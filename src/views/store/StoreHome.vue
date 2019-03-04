<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :randomBook="randomBook"></flap-card>
    <scroll @onScroll="onScroll"
            :top="scrollTop"
            class="test"
            ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage: `url(${bannerSrc})`}"></div>
      </div>
      <!--猜你喜欢-->
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <!--热门推荐-->
      <hot-recommend class="block" :data="hotRecommend"></hot-recommend>
      <!--精选-->
      <featured class="block"
                :data="featured"
                :titleText="$t('home.featured')"
                :btn-text="$t('home.seeAll')"
      ></featured>
      <!--分类推荐-->
      <div class="block"
           v-for="(data, index) in categoryList" :key="index"
      >
        <category-book :data="data"></category-book>
      </div>
      <!--分类-->
      <categorys class="block" :data="categories"></categorys>
    </scroll>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import { storeHomeMixin } from '../../utils/mixin'
  import FlapCard from '../../components/home/FlapCard'
  import { home } from '../../api/store'
  import GuessYouLike from '../../components/home/GuessYouLike'
  import HotRecommend from '../../components/home/HotRecommend'
  import Featured from '../../components/home/Featured'
  import CategoryBook from '../../components/home/CategoryBook'
  import Categorys from '../../components/home/Categorys'

  export default {
    mixins: [storeHomeMixin],
    components: {
      Categorys,
      HotRecommend,
      GuessYouLike,
      FlapCard,
      SearchBar,
      Scroll,
      Featured,
      CategoryBook
    },
    data () {
      return {
        scrollTop: 94,
        bannerSrc: '',
        randomBook: null,
        guessYouLike: null,
        hotRecommend: null,
        featured: null,
        categoryList: null,
        categories: null
      }
    },
    methods: {
      onScroll (offsetY) {
        this.setOffsetY(offsetY)
        if (offsetY > 0) {
          this.scrollTop = 62
        } else {
          this.scrollTop = 94
        }
      },
      getHomeData() {
        home().then((res) => {
          if (res && res.status === 200) {
            const data = res.data
            this.randomBook = data.random
            this.bannerSrc = data.banner
            this.guessYouLike = data.guessYouLike
            this.hotRecommend = data.recommend
            this.featured = data.featured
            this.categoryList = data.categoryList
            this.categories = data.categories
          } else {
            this.createSampleToast(res.data.msg)
          }
        })
      }
    },
    mounted () {
      this.getHomeData()
      // 等切换页面的过渡动画完成后再将home滚动到之前的位置
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, this.offsetY)
      }, 300)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .store-home {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .banner-wrapper {
    width: 100%;
    padding: 0 px2rem(10);
    box-sizing: border-box;
    margin-top: px2rem(5);
    .banner-img {
      width: 100%;
      height: px2rem(150);
      background-size: 100% 100%;
    }
  }
  .block {
    margin-bottom: px2rem(15);
  }
</style>
