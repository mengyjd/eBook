<template>
  <div id="app">
    <router-view/>
    <p class="text">ABCDEFG</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['test'])
    },
    mounted() {
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style lang="scss">
  @import "./assets/styles/global";
  .text {
    font-family: "Days One";
    font-size: px2rem(20);
    color: red;
  }

</style>
