<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :randomBook="randomBook"></flap-card>
    <scroll @onScroll="onScroll"
            :top="scrollTop"
            ref="scroll"
    >
      <div>第一行第一行第一行</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>11111111111111111111111111111111111111111</div>
      <div>最后最后最后</div>
    </scroll>
  </div>
</template>

<script>
  import SearchBar from '@/components/home/SearchBar'
  import Scroll from '@/components/common/Scroll'
  import { storeHomeMixin } from '../../utils/mixin'
  import FlapCard from '../../components/home/FlapCard'
  import { home } from '../../api/store'

  export default {
    mixins: [storeHomeMixin],
    components: {
      FlapCard,
      SearchBar,
      Scroll
    },
    data () {
      return {
        scrollTop: 94,
        randomBook: null
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
        this.$refs.scroll.refresh()
      }
    },
    mounted () {
      home().then((res) => {
        if (res && res.status === 200) {
          const data = res.data
          const randomIndex = Math.floor(Math.random() * data.random.length)
          this.randomBook = data.random[randomIndex]
        }
      })
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
</style>
