<template>
  <div class="app-wrapper" :style="{minHeight:height}">
    <navbar></navbar>
    <app-main ></app-main>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import { Navbar, BottomBar, AppMain } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain,
    BottomBar
  },
  created() {
    this.setCurrentHeight()
    this.$i18n.locale = this.$store.state.app.language
    window.addEventListener('resize', function() {
      this.setCurrentHeight()
    }.bind(this), false)
  },
  data() {
    return {
      height: null
    }
  },
  methods: {
    setCurrentHeight() {
      const height = document.body.offsetHeight - 40
      const dialogHeight = document.body.offsetHeight * 0.75
      this.height = document.body.offsetHeight + 'px'
      this.$store.dispatch('setContainHeight', { height, dialogHeight })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper{
  position: relative;
  padding-bottom: 40px;
}
</style>
