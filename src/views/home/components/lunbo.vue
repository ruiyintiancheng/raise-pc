<template>
    <div class="lunbo">
<el-carousel :interval="5000" arrow="always" :height="height+'px'" @click.native="skip" ref="carousel">
    <el-carousel-item v-for="item in banners" :key="item.id">
     <img :src="item.urlNew" alt="" >
    </el-carousel-item>
  </el-carousel>
    </div>
</template>

<script>
export default {
  props: {
    banners: Array
  },
  data() {
    return {
      banner: [
        { id: 1, url: require('../../../assets/shouye-img/banner1.png'), link: '/course/sp' },
        { id: 2, url: require('../../../assets/shouye-img/banner2.png'), link: '/course/firstStep' },
        { id: 3, url: require('../../../assets/shouye-img/banner3.png'), link: '/skip' }
      ],
      height: ''
    }
  },
  mounted() {
    const Bwidth = document.body.offsetWidth < 1440 ? 1440 : document.body.offsetWidth
    this.height = Bwidth * 500 / 1600
  },
  methods: {
    skip() {
      const activeIndex = this.$refs.carousel.activeIndex
      window.location.href = this.banners[activeIndex].skipUrl
    }
  }
}
</script>

<style lang="scss">
    .lunbo{
      margin: 0 auto;
      // margin-bottom:100px;
      cursor: pointer;
      .el-carousel ul{
         margin-bottom: 16px;
         }
      .el-carousel ul li button{
          background-color: #ffffff;
          width: 20px;
          height: 6px;
          border-radius: 3px;
          margin-right:20px
      }
   img{width:100%}
    }
</style>