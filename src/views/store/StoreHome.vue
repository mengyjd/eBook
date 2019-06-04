<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :randomBook="homeData.randomBook"></flap-card>
    <scroll @onScroll="onScroll"
            :top="scrollTop"
            ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage: `url(${homeData.bannerSrc})`}"></div>
      </div>
      <!--猜你喜欢-->
      <guess-you-like :data="homeData.guessYouLike"
                      @changeYouLike="changeYouLike"></guess-you-like>
      <!--热门推荐-->
      <hot-recommend class="block" :data="homeData.hotRecommend"></hot-recommend>
      <!--精选-->
      <featured class="block"
                :data="homeData.featured"
                :titleText="$t('home.featured')"
                :btn-text="$t('home.seeAll')"
      ></featured>
      <!--分类推荐-->
      <div class="block"
           v-for="(data, index) in homeData.categoryList" :key="index"
      >
        <category-book :data="data"></category-book>
      </div>
      <!--分类-->
      <categorys class="block" :data="homeData.categories"></categorys>
    </scroll>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import { storeHomeMixin } from '../../utils/mixin'
  import FlapCard from '../../components/home/FlapCard'
  import { guessYouLikeList, home } from '../../api/store'
  import GuessYouLike from '../../components/home/GuessYouLike'
  import HotRecommend from '../../components/home/HotRecommend'
  import Featured from '../../components/home/Featured'
  import CategoryBook from '../../components/home/CategoryBook'
  import Categorys from '../../components/home/Categorys'
  import { getLocalHomeData, saveHomeData } from '../../utils/localStorage'

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
        homeData: {
          bannerSrc: '',
          randomBook: null,
          guessYouLike: [],
          hotRecommend: null,
          featured: null,
          categoryList: null,
          categories: null
        }
      }
    },
    methods: {
      // 改变猜你喜欢的数据
      changeYouLike () {
        guessYouLikeList().then(result => {
          if (result.status === 200 && result.statusText === 'OK') {
            this.homeData.guessYouLike = result.data.guessYouLikeList
          } else {
            this.createSampleToast(result.data.msg)
          }
        })
      },
      onScroll (offsetY) {
        this.setOffsetY(offsetY)
        if (offsetY > 0) {
          this.scrollTop = 62
        } else {
          this.scrollTop = 94
        }
      },
      // 从服务端获取首页数据
      getHomeDataFromServer () {
        home().then((res) => {
          if (res && res.status === 200) {
            const data = res.data
            this.homeData.randomBook = data.random
            this.homeData.bannerSrc = data.banner
            this.homeData.guessYouLike = data.guessYouLike
            this.homeData.hotRecommend = data.recommend
            this.homeData.featured = data.featured
            this.homeData.categoryList = data.categoryList
            this.homeData.categories = data.categories
          } else {
            this.createSampleToast(res.data.msg)
          }
        }).then(() => {
          saveHomeData(this.homeData) // 将数据保存到本地
          this.scrollToRecent() // 首页数据加载完成后滚动到之前的位置
          this.$store.commit('SET_IS_FROM_SERVER', false)
        })
      },
      scrollToRecent () {
        this.$nextTick(() => {
          this.$refs.scroll.scrollTo(0, this.offsetY)
        })
      }
    },
    created () {
      if (this.$store.state.isGetHomeFromServer) {
        this.getHomeDataFromServer() // 如果本地数据不存在，则从网络获取
      } else {
        this.homeData = getLocalHomeData()
        this.scrollToRecent()
      }
      // const homeData = getLocalHomeData() // 获取本地数据
      // console.log('从本地获取', homeData)
      // if (!homeData) {
      //   console.log('从网络获取')
      // } else {
      //   this.homeData = homeData // 如果本地数据存在，将数据给vue对象
      //   this.scrollToRecent()
      // }
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

  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: red;
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
