<template>
  <div class="flap-card-wrapper"
       v-show="flapCardVisible">
    <!--加载动画-->
    <div class="flap-card-bg"
         :class="{'animation': runFlapCardAnimation}"
         v-show="runFlapCardAnimation"
    >
      <div class="flap-card"
           v-for="(item, index) in flapCardList"
           :key="index"
      >
        <div class="flap-cared-circle">
          <div class="semi-circle semi-circle-left"
               :style="semiCircleStyle(item, 'imgLeft')"
               ref="left"
          ></div>
          <div class="semi-circle semi-circle-right"
               :style="semiCircleStyle(item, 'imgRight')"
               ref="right"
          ></div>
        </div>
      </div>
    </div>
    <!--烟花动画-->
    <div class="point-wrapper">
      <div class="point"
           v-for="item in pointList" :key="item"
           :class="{'animation': runPointAnimation}"
      ></div>
    </div>
    <!--关闭按钮-->
    <div class="flap-card-close">
      <div class="clear-search-text-wrapper"
           @click="closeFlapCard"
      >
        <span class="icon-close"></span>
      </div>
    </div>
    <!--推荐图书卡片-->
    <div class="recommend-book-card" v-if="runRecommendBookAnimation">
      <div class="recommend-book-card-wrapper"
           :class="{'animation': runRecommendBookAnimation}"
           v-show="runRecommendBookAnimation"
      >
        <div class="book-img-wrapper">
          <img class="img" :src="randomBook ? randomBook.cover: ''" alt="书籍封面">
        </div>
        <div class="book-content">
          <div class="title book-info">{{randomBook.title}}</div>
          <div class="author book-info">{{randomBook.author}}</div>
          <div class="category book-info">{{getCategory(randomBook.categoryText)}}</div>
        </div>
        <div class="read-btn"
             @click.stop="goToDetail(randomBook)"
        >{{$t('home.readNow')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin'
  import { flapCardList, getTranslateCategoryText } from '../../utils/store'

  export default {
    mixins: [storeHomeMixin],
    props: {
      randomBook: Object
    },
    data () {
      return {
        flapCardList,
        front: 0,
        back: 1,
        animationTime: 25, // 卡片每一次翻转间隔时间
        runFlapCardAnimation: false, // 卡片翻转动画
        runPointAnimation: false, // 烟花动画,
        runRecommendBookAnimation: false, // 推荐图书动画
        pointList: null
      }
    },
    watch: {
      flapCardVisible (v) {
        if (v) {
          this.runAnimation()
        }
      }
    },
    created () {
      // 创建一个数组,用于在v-for循环中生成烟花动画所需dom
      this.pointList = []
      for (let i = 0; i < 18; i++) {
        this.pointList.push(`point${i}`)
      }
    },
    methods: {
      semiCircleStyle (item, direction) {
        return {
          backgroundImage: item[direction],
          backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
          zIndex: item.zIndex
        }
      },
      // 执行卡片翻转的操作
      rotate (index, type) {
        const item = this.flapCardList[index]
        let dom
        if (type === 'front') {
          dom = this.$refs.right[index]
        } else {
          dom = this.$refs.left[index]
        }
        dom.style.transform = `rotateY(${item.rotateDegree}deg)`
        dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
      },
      // 计算卡片翻转的参数
      flapCardRotate () {
        const frontFlapCard = this.flapCardList[this.front]
        const backFlapCard = this.flapCardList[this.back]
        frontFlapCard.rotateDegree += 10
        frontFlapCard._g -= 5
        backFlapCard.rotateDegree -= 10
        if (backFlapCard.rotateDegree < 90) {
          backFlapCard._g += 5
        }
        if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
          backFlapCard.zIndex += 2
        }
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        // 当一张图片转动完成后切换到下一组
        if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
          this.next()
        }
      },
      // 先将左侧的卡片翻转180度
      prepare () {
        const backFlapCard = this.flapCardList[this.back]
        backFlapCard.rotateDegree = 180
        backFlapCard._g = backFlapCard.g - 5 * 9
        this.rotate(this.back, 'back')
      },
      // 下一张卡片
      next () {
        // 在进行下一组旋转之前
        // 对上一组的图片进行还原操作
        const frontFlapCard = this.flapCardList[this.front]
        const backFlapCard = this.flapCardList[this.back]
        frontFlapCard.rotateDegree = 0
        backFlapCard.rotateDegree = 0
        frontFlapCard._g = frontFlapCard.g
        backFlapCard._g = backFlapCard.g
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        // 指向下一组图片
        this.front++
        this.back++
        const len = this.flapCardList.length
        if (this.front >= len) {
          this.front = 0
        }
        if (this.back >= len) {
          this.back = 0
        }
        // 动态设置zIndex
        // 100 => 96
        // 99 => 100
        // 98 => 99
        // 97 => 96
        // 96 => 97
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - ((index - this.front + len) % len)
        })
        this.prepare()
      },
      reset () {
      },
      // 启动卡片翻转动画
      startFlapCardAnimation () {
        this.prepare()
        // 25毫秒翻转一次卡片
        this.flapCardAnimationTimer = setInterval(() => {
          this.flapCardRotate()
        }, 25)
      },
      // 停止卡片翻转动画
      stopFlapCardAnimation () {
        this.runFlapCardAnimation = false
        if (this.flapCardAnimationTimer) {
          clearInterval(this.flapCardAnimationTimer)
        }
        // 将每个卡片重置为初始状态
        this.front = 0
        this.back = 1
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - index
          item.rotateDegree = 0
          item._g = item.g
          this.rotate(index, 'front')
          this.rotate(index, 'back')
        })
      },
      // 启动图书推荐动画
      startRecommendBookAnimation () {
        // this.stopFlapCardAnimation()
        // this.runPointAnimation = false
        this.runRecommendBookAnimation = true
      },
      // 停止图书推荐动画
      stopRecommendBookAnimation () {
        this.runRecommendBookAnimation = false
      },
      // 开始播放动画
      runAnimation () {
        this.runFlapCardAnimation = true // 启动登场动画 300ms
        this.timeout1 = setTimeout(() => {
          this.runPointAnimation = true
          this.startFlapCardAnimation()
          this.timeout2 = setTimeout(() => {
            this.runPointAnimation = false
          }, 750)
          this.timeout3 = setTimeout(() => {
            this.stopFlapCardAnimation()
            this.startRecommendBookAnimation()
          }, 2500)
        }, 300)
      },
      stopAnimation () {
        this.stopFlapCardAnimation()
        this.runPointAnimation = false
      },
      // 关闭随机推荐卡片
      closeFlapCard () {
        this.setFlapCardVisible(false)
        this.stopAnimation()
        this.stopRecommendBookAnimation()
        if (this.timeout1) {
          clearTimeout(this.timeout1)
        }
        if (this.timeout2) {
          clearTimeout(this.timeout2)
        }
        if (this.timeout3) {
          clearTimeout(this.timeout3)
        }
      },
      // 获取翻译后的分类名称
      getCategory (categoryText) {
        return getTranslateCategoryText(categoryText, this)
      },
      // 显示图书详情
      goToDetail (randomBook) {
        this.showDetail(randomBook)
        this.closeFlapCard()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/flapCard";

  .flap-card-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    @include center;
  }

  /*烟花动画*/
  .point-wrapper {
    width: px2rem(64);
    height: px2rem(64);
    @include absCenter;
    z-index: 1500;

    .point {
      border-radius: 50%;
      @include absCenter;

      &.animation {
        @for $i from 1 to length($moves) {
          &:nth-child(#{$i}) {
            @include move($i)
          }
        }
      }
    }
  }

  /*图片翻转动画和登场动画*/
  .flap-card-bg {
    position: relative;
    width: px2rem(64);
    height: px2rem(64);
    background-color: #fff;
    border-radius: px2rem(5);
    @include center;

    &.animation {
      animation: flap-card-move $animationTime ease-in;
    }

    .flap-card {
      position: absolute;
      width: px2rem(45);
      height: px2rem(45);

      .flap-cared-circle {
        display: flex;
        width: 100%;
        height: 100%;

        .semi-circle {
          flex: 0 0 50%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: 50% 50%;
          backface-visibility: hidden;
        }

        .semi-circle-left {
          background-position: right center;
          border-radius: px2rem(24) 0 0 px2rem(24);
          transform-origin: right;
        }

        .semi-circle-right {
          background-position: left center;
          border-radius: 0 px2rem(24) px2rem(24) 0;
          transform-origin: left;
        }
      }
    }
  }

  /*关闭按钮*/
  .flap-card-close {
    position: absolute;
    bottom: px2rem(30);
    width: 100%;
    @include center;

    .clear-search-text-wrapper {
      @include center;
      width: px2rem(45);
      height: px2rem(45);
      z-index: 1100;
      border-radius: 50%;
      background-color: #333333;

      .icon-close {
        font-size: px2rem(30);
        color: #fff;
      }
    }
  }

  /*推荐图书卡片*/
  .recommend-book-card {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    @include center;
    font-size: 12px;

    .recommend-book-card-wrapper {
      $borderRadius: 8;
      background-color: #fff;
      width: 80%;
      box-sizing: border-box;
      text-align: center;
      border-radius: px2rem($borderRadius);
      /*推荐图书动画*/
      &.animation {
        animation: flap-card-move $animationTime ease-in;
      }

      .book-img-wrapper {
        width: 100%;
        @include center;
        padding: px2rem(15) 0;
        box-sizing: border-box;

        .img {
          width: px2rem(110);
        }
      }

      .book-content {
        padding: 0 px2rem(40);

        .book-info {
          margin-bottom: px2rem(15);
        }

        .title {
          font-size: px2rem(20);
          @include ellipsis2(2, word-wrap);
          color: #000;
        }

        .author {
          font-size: px2rem(16);
          @include ellipsis();
          color: #444;
        }

        .category {
          font-size: px2rem(14);
          @include ellipsis();
          color: #999;
        }
      }

      .read-btn {
        background-color: #0089fa;
        width: 100%;
        height: px2rem(50);
        font-size: px2rem(17);
        color: #fff;
        @include center;
        border-bottom-left-radius: px2rem($borderRadius);
        border-bottom-right-radius: px2rem($borderRadius);
      }
    }
  }

  /*登场动画*/
  @keyframes flap-card-move {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
