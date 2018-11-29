<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Epub from 'epubjs'

  global.epub = Epub
  export default {
    computed: {
      ...mapGetters(['fileName'])
    },
    methods: {
     initEpub () {
        const url = 'http://192.168.1.2:3001/epub/' + this.fileName + '.epub'
        this.book = new Epub(url)
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        this.rendition.display()
      }
    },
    mounted () {
      // const fileName = this.$route.params.fileName.split('|').join('/')
      this.$store.dispatch('setFileName', this.$route.params.fileName.split('|').join('/'))
        .then(() => {
          this.initEpub()
        })
    }
  }
</script>

<style scoped>
</style>
